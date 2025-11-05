namespace StudentManagement.DomainModels
{
    public class Student
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string ProfileImageUrl { get; set; }
        public Guid GenderId { get; set; }
        public Gender Gender { get; set; }
        public Address Address { get; set; }
        public string NationalId { get; set; }
        public string Department { get; set; }
        public string StudentNumber { get; set; }
        public DateTime EnrollmentDate { get; set; }
    }
}
