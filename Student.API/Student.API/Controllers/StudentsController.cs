using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.DataModels;
using StudentManagement.DomainModels;
using StudentManagement.Helpers;
using StudentManagement.Repositories;

namespace StudentManagement.Controllers
{
    [ApiController]
    public class StudentsController : Controller
    {
        private readonly IStudentRepository studentRepository;
        private readonly IImageRepository imageRepository;
        private readonly IMapper mapper;

        public StudentsController(IStudentRepository studentRepository, IMapper mapper, IImageRepository imageRepository)
        {
            this.studentRepository = studentRepository; 
            this.mapper = mapper; 
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllStudentsAsync() 
        { 
            var students = await studentRepository.GetStudentsAsync();
            return Ok(mapper.Map<List<DomainModels.Student>>(students));
        }

        [HttpGet]
        [Route("[controller]/{studentId:guid}"), ActionName("GetStudentAsync")]
        public async Task<IActionResult> GetStudentAsync([FromRoute] Guid studentId)
        {

            var student = await studentRepository.GetStudentAsync(studentId);
            if(student == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<DomainModels.Student>(student));
        }

        [HttpPut]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> UpdateStudentAsync([FromRoute] Guid studentId, [FromBody] UpdateStudentRequest request)
        {
            if (!TcKimlikValidator.IsValid(request.NationalId))
                return BadRequest(new { error = "Geçersiz TC Kimlik Numarası." });

            if (await studentRepository.Exists(studentId))
            {
                var updatedStudent = await studentRepository.UpdateStudent(studentId, mapper.Map<DataModels.Student>(request));
                if(updatedStudent != null)
                {
                    return Ok(mapper.Map<DataModels.Student>(updatedStudent));
                }
            }
            return NotFound();
        }

        [HttpPost]
        [Route("[controller]/Add")]
        public async Task<IActionResult> AddStudentAsync([FromBody] AddStundentRequest request)
        {
            if (!TcKimlikValidator.IsValid(request.NationalId))
                return BadRequest(new { error = "Geçersiz TC Kimlik Numarası." });

            try
            {
                var studentEntity = mapper.Map<DataModels.Student>(request);
                studentEntity.ProfileImageUrl ??= "Resources/Images/b734db01-f65c-4be7-94f7-bac0be89df9a.png";
                var student = await studentRepository.AddStudent(mapper.Map<DataModels.Student>(studentEntity));
                return CreatedAtAction(nameof(GetStudentAsync), new { studentId = student.Id }, mapper.Map<DataModels.Student>(student));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }


        [HttpDelete]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> DeleteStudentAsync([FromRoute] Guid studentId)
        {
            if (await studentRepository.Exists(studentId))
            {
                var student = await studentRepository.DeleteStudent(studentId);
                if (student != null)
                {
                    return Ok(mapper.Map<DataModels.Student>(student));
                }
            }
            return NotFound();

        }

        [HttpPost]
        [Route("[controller]/{studentId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromRoute] Guid studentId, IFormFile profileImage)
        {
            var validExtensions = new List<string>
            {
                ".jpeg",
                ".png",
                ".gif",
                ".jpg"
            };

            if(profileImage != null && profileImage.Length > 0)
            {
                var extension = Path.GetExtension(profileImage.FileName);
                if(validExtensions.Contains(extension))
                {
                    if(await studentRepository.Exists(studentId))
                    {
                        var fileName = Guid.NewGuid() + Path.GetExtension(profileImage.FileName);
                        var fileImagePath = await imageRepository.Upload(profileImage, fileName);

                        if(await studentRepository.UpdateProfileImage(studentId, fileImagePath))
                        {
                            return Ok(fileImagePath);
                        }

                        return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image");
                    }
                }
                return BadRequest("This is not a valid Image format");
            }

            return NotFound();

        }

    }
}
