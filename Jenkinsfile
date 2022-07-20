pipeline {
    agent none

    environment {
        DOCKER_IMAGE= "phongson92/portfolio-reactjs"
    }

    stages {
        
        // stage ("Test") {
            //when { equals expected: true, actual: Test }   
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

        stage ("Build"){
            
            agent any
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
                 
            }
        }

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
         stage ("Push Image - Code 2"){
            agent any
            environment {
                registryCredential = 'docker-hub'
            }
            steps {
                script {
                    dockerimage = docker.build DOCKER_IMAGE
                    docker.withRegistry('', registryCredential){
                        dockerimage.push("$BUILD_NUMBER")
                        dockerimage.push('latest')
                    //sh "docker image rm ${DOCKER_IMAGE}:latest"
                    //sh "docker image rm ${DOCKER_IMAGE}:$BUILD_NUMBER"
                    }
                    
                }
           
            }
        }
        stage ("Deploy Image to Test"){
            agent any       
            steps {
                sshagent(['deploy_user']) {
                   sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173  'docker ps -q --filter name=reactjs | grep -q . && docker stop reactjs && docker rm -fv reactjs '"
                   sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173 'docker rmi $DOCKER_IMAGE'" 
                   sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173  'docker run -it -d --name reactjs -p 8080:80 $DOCKER_IMAGE:latest' "
                   //sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173  'docker ps -aq | xargs docker stop | xargs docker rm && docker run -it -d --name reactjs -p 8080:80 $DOCKER_IMAGE:latest'"
                }
            }
        }
        stage ("Deploy to K8s"){
            agent any       

            steps {
                    script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        }             
                 
            }
        }
        
    }//end stages
        

    
}//end pipeline
