﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Controllers
{
    // Post http://localhost:5000/api/Values
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;

        }


        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            //return new string[] { "value1", "value2", "value3", "value4" };
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue (int id)
        {
            //return "value";
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }


        // POST api/values
        [HttpPost]
        public async Task<IActionResult> AddValue ([FromBody] Value value)
        {
            _context.Values.Add(value);
            await _context.SaveChangesAsync();
            return Ok(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditValue(int id, [FromBody] Value value)
        {
            var data = await _context.Values.FindAsync(id);
            data.Name = value.Name;
            _context.Values.Update(data);
            await _context.SaveChangesAsync();
            return Ok(data);


        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteValue(int id)
        {
            var data = await _context.Values.FindAsync(id);

                if(data == null)
                    return NoContent();

           
            _context.Values.Remove(data);
            await _context.SaveChangesAsync();
            return Ok(data);

        }
    }
}
