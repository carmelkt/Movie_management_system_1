namespace WebAPI.Models
{
    public class Vehicle
    {       

        public string category{get;set;}

        public virtual Brand[] Brands{get;set;}
    }
}