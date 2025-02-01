#!/usr/bin/env node
const axios = require('axios');
const {Command} = require('commander');

const program = new Command();

program
.version('1.0.0')
.description('this program gets username and gives the user recent activities')
.argument('<username>')
.action(async(username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events/public`);
      const events = response.data;

      if (events.length === 0) {
        console.log(`No recent activities found for user: ${username}`);
        return;
      }
        events.forEach((event, index) => {
            
              console.log(`${index + 1}. Event Type: ${event.type}`);
              console.log(`   Repo: ${event.repo.name}`);
              console.log(`   Date: ${new Date(event.created_at).toLocaleString()}`);
    
              // Extract commit messages
              if(event.payload.commits){
                event.payload.commits.forEach((commit, commitIndex) => {
                    console.log(`   Commit ${commitIndex + 1}: ${commit.message}`);
                  });
              }
              
    
            
        })

    //   if (events.length === 0) {
    //     console.log(`No recent activities found for user: ${username}`);
    //     return;
    //   }
    //   console.log(`Recent activities for user: ${username}\n`);
    //   events.forEach((event) => {
    //     console.log(`   Repo: ${event.repo.name}`);
    //     console.log(`   Date: ${new Date(event.created_at).toLocaleString()}`);
    //     console.log(`commit message: ${event.payload.commits.message}`);
    //   });
    } catch (error) {
        console.log(error, "error fetching activities")
    }
})



// Parse the command-line arguments
program.parse(process.argv);