using LandMaster.Data;
using LandMaster.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace LandMaster.Services
{
    public class FeedbackService
    {
        private ApplicationDbContext _context;
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            /* 
            This method fetches all the feedbacks from the server
            and returns a list of feedbacks including user details.
            */

            IEnumerable<Feedback> list = await _context.Feedbacks.Include(feedback => feedback.User).ToListAsync();
            return list;
        }
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {

            /*
            This method fetches feedbacks for a specific user based on user ID.
            Returns a list of feedbacks if found, otherwise returns null.
            */

            var feedbacks = await _context.Feedbacks.Where(feed => feed.UserId == userId).ToListAsync();
            if (feedbacks != null)
            {
                return feedbacks;
            }
            return null;
        }
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            /*
            This method adds a new feedback to the database.
            Saves changes and returns true upon successful addition.
            */
            feedback.User = null;
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteFeedback(int feedbackId)
        {

            /*
            This method deletes a feedback from the database based on feedback ID.
            Returns true if deletion is successful, otherwise returns false.
            */
            Feedback feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
