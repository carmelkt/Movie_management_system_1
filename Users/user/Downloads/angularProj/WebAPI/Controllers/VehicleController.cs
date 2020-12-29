using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;
using WebAPI.Data.Repo;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        public VehicleController()
        {
        }

        [HttpPost("post")]
        public IActionResult VehicleTest(Vehicle vehicle)
        { 
            // var category=await ehicle.category;
            return Ok(vehicle);
        }
    }
}