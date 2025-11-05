using AutoMapper;
using StudentManagement.DomainModels;

namespace StudentManagement.Profiles.AfterMaps
{
    public class AddStundentRequestAfterMap : IMappingAction<AddStundentRequest, DataModels.Student>
    {
        public void Process(AddStundentRequest source, DataModels.Student destination, ResolutionContext context)
        {
            destination.Id = Guid.NewGuid();
            destination.Address = new DataModels.Address()
            {
                Id = Guid.NewGuid(),
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress
            };
        }
    }
}
