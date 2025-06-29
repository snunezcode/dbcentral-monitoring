// AWS Config Variables
const fs = require('fs');

// AWS Config Variables
const { classLogging } = require('./class.logging.js');


//--#################################################################################################### 
//--#################################################################################################### 
//   ---------------   CLASS  :  classManagement
//--#################################################################################################### 
//--#################################################################################################### 

        

class classManagement {


    #objLog = new classLogging({ name : "classManagement", instance : "generic" });

    //--## Contrutor
    constructor(logger = console) {
    
    }

    //--## Get profile
    async getProfile(config){
           
        try {

            var profiles = JSON.parse(fs.readFileSync('./profiles.json'));
            if (profiles.hasOwnProperty(config.userId)) {
                return profiles[config.userId];
            }
            else{
                return {
                    accounts: [],
                    regions: []     
                  };
            }

            

        }
        catch(err){
            this.#objLog.write("getProfile","err",err);                
            return { 
                    accounts : [],
                    regions : []   
            };
        }
  
    } 


    //--## Update profile
    async updateProfile(config){
           
        try {
            
            var profiles = {};
            if (fs.existsSync('./profiles.json')) {
                profiles = JSON.parse(fs.readFileSync('./profiles.json'));            
            }
            
            profiles[config.userId] = config['profile'];            
            
            fs.writeFileSync('./profiles.json',JSON.stringify(profiles, null, 4));            
            return profiles[config.userId];
        }
        catch(err){
            this.#objLog.write("updateProfile","err",err);                
            return { 
                    accounts : [],
                    regions : []   
            };
        }
  
    } 



  }



module.exports = { classManagement  };



                