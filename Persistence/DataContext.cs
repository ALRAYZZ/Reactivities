using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }


        // This represents a table in the database,
        // and the properties of the Activity class represent the columns of the table.
        public DbSet<Activity>? Activities { get; set; }
    }
}