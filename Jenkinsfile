pipeline {
    agent any
    tools {
        nodejs 'Node22' // Updated to Node.js 22
    }
    environment {
        MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Sanskruti2209/todo-app.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Start MongoDB') {
            steps {
                script {
                    // Check if MongoDB is running; start if not
                    bat '''
                        tasklist | findstr "mongod" || start /B mongod --dbpath C:\\data\\db
                    '''
                }
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test -- --config=jest.config.js --coverage'
                junit 'test-results.xml'
            }
        }
        stage('Deploy') {
            when {
                branch 'main' // Deploy only on main branch
            }
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    bat '''
                        git config --global user.email "jenkins@ci.com"
                        git config --global user.name "Jenkins CI"
                        npm run deploy
                    '''
                }
            }
        }
    }
    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'coverage/lcov-report',
                reportFiles: 'index.html',
                reportName: 'Jest Coverage Report'
            ])
            archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
            // Clean up MongoDB process
            bat 'taskkill /IM mongod.exe /F || exit 0'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
