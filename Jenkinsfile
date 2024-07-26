pipeline {
    agent {
        label "GODEV"
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {
        stage('Install Hugo') {
            steps {
                sh '''#!/bin/bash

                '''
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash

                '''
            }
        }
        stage("Push blog online") {
            steps {
                sh '''#!/bin/bash

                '''
            }
        }
        stage("Clean up") {
            steps {
                dir('/home/jenkins/workspace') {
                    sh 'rm -r PepsFeeder'
                }
            }
        }
        stage("Send Report to Slack") {
            steps {
                slackSend(color: "good", message: "PepsFeeder Project Processed", channel: "#jenkins")
            }
        }
    }
}
