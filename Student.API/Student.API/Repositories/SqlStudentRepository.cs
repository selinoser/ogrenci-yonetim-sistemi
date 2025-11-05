
using Azure.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using StudentManagement.DataModels;
using StudentManagement.DomainModels;
using StudentManagement.Helpers;

namespace StudentManagement.Repositories
{
    public class SqlStudentRepository : IStudentRepository
    {

        private readonly StudentAdminContext context;
        
        public SqlStudentRepository(StudentAdminContext context)
        {
            this.context = context;
        }

        public async Task<List<DataModels.Student>> GetStudentsAsync()
        {
            return await context.Student.Include(nameof(DataModels.Gender)).Include(nameof(DataModels.Address)).ToListAsync();
        }

        public async Task<DataModels.Student> GetStudentAsync(Guid studentId)
        {
            return await context.Student.Include(nameof(DataModels.Gender)).Include(nameof(DataModels.Address)).FirstOrDefaultAsync(x => x.Id == studentId);
        }

        public async Task<List<DataModels.Gender>> GetGendersAsync()
        {
            return await context.Gender.ToListAsync();
        }

        public async Task<bool> Exists(Guid studentId)
        {
           return await context.Student.AnyAsync(x => x.Id == studentId);   
        }

        public async Task<DataModels.Student> UpdateStudent(Guid studentId, DataModels.Student request)
        {

            if (!Helpers.TcKimlikValidator.IsValid(request.NationalId))
                throw new ArgumentException("Geçersiz TC Kimlik Numarası.");

            var existingStudent = await GetStudentAsync(studentId);
            if(existingStudent != null) { 
                existingStudent.FirstName = request.FirstName;
                existingStudent.LastName = request.LastName;
                existingStudent.DateOfBirth = request.DateOfBirth;
                existingStudent.Email = request.Email;
                existingStudent.Mobile = request.Mobile;
                existingStudent.GenderId = request.GenderId;    
                existingStudent.Address.PhysicalAddress = request.Address.PhysicalAddress;
                existingStudent.Address.PostalAddress = request.Address.PostalAddress;
                existingStudent.NationalId = request.NationalId;
                existingStudent.Department = request.Department;
                existingStudent.EnrollmentDate = request.EnrollmentDate;
                existingStudent.StudentNumber = request.StudentNumber;

                await context.SaveChangesAsync();
                return existingStudent;

            }
            return null;
        }

        public async Task<DataModels.Student> AddStudent(DataModels.Student request)
        {

            if (!Helpers.TcKimlikValidator.IsValid(request.NationalId))
                throw new ArgumentException("Geçersiz TC Kimlik Numarası.");

            request.ProfileImageUrl ??= "Resources/Images/b734db01-f65c-4be7-94f7-bac0be89df9a.png";

            // Eğer Address null değilse, EF Core cascade insert otomatik çalışacak
            if (request.Address != null)
            {
                // EF Core 5+ ile Student-Address ilişkisi zaten context üzerinde tanımlı olmalı
            }
            var student = await context.Student.AddAsync(request);
            await context.SaveChangesAsync();
            return student.Entity;
        }

        public async Task<bool> UpdateProfileImage(Guid studentId, string profileImageUrl)
        {
            var student = await GetStudentAsync(studentId);

            if(student != null)
            {
                student.ProfileImageUrl = profileImageUrl;
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<DataModels.Student> DeleteStudent(Guid studentId)
        {
            var existingStudent = await GetStudentAsync(studentId);
            if (existingStudent != null)
            {
                context.Student.Remove(existingStudent);
                await context.SaveChangesAsync();
                return existingStudent;

            }
            return null;
        }
    }
}
