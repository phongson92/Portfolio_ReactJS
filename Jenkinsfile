pipeline {
    agent none

    environment {
        DOCKER_IMAGE= "phongson92/portfolio-reactjs"
    }

    stages {
        
        // stage ("Test") {
        //     agent {
        //         docker {
        //             image 'node:13-alpine'
        //             args '-u 0:0 -v /tmp:/root/.cache'
        //         }
        //     }
        //     steps {
        //         sh "npm install"
        //         sh "npm test"
            
        //      }
        // }

        // stage ("Build"){
        //     agent any
        //     steps {
        //         sh 'docker build -t $DOCKER_IMAGE:latest .'
                 
        //     }
        // }

        // stage ("Push Image"){
        //     agent any
        //     steps {
        //     withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //     sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
        //     sh "docker push ${DOCKER_IMAGE}:latest"
        // }   
        //     //clean to save disk
        //     sh "docker image rm ${DOCKER_IMAGE}:latest"
        //     }
        // }
        stage ("Deploy Image"){
            agent any       
            steps {
                sshagent(['deploy_user']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@103.92.25.173 mkdir -p /root/test'
                 //sh 'ssh -o StrictHostKeyChecking=no  root@103.92.25.173 && mkdir -p /root/test'
                 
                 
    
                }
                //sh 'ssh -o StrictHostKeyChecking=no -i /var/jenkins_home/.ssh/web-key.pem root@103.92.25.173'
                
                // stop and remove all running container
                //sh 'docker ps -aq | xargs docker stop | xargs docker rm &&'
               // sh 'docker stop reactjs && docker rm reactjs'
                // run image              
            // sh 'docker run -it -d --name reactjs -p 8081:80 $DOCKER_IMAGE:latest'
            }
        }
        // stage ("Deploy to K8s"){
        //     agent any       
        //     steps {
        //         script {
        //             script {
        //   kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        // }
        //         }
                 
        //     }
        // }
        
    }//end stages
        

    
}//end pipeline
