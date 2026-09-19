
def runCommand(String command) {
    if (isUnix()) {
        sh command
    } else {
        bat command
    }
}

pipeline {

    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    options {
        buildDiscarder(
            logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '10'
            )
        )
        quietPeriod(15)
        disableConcurrentBuilds(abortPrevious: true)
    }

    environment {
        MASTER_TO_LIVE = 'DEPLOY'

        RELEASE_TO_PRELIVE = 'DEPLOY'
        HOTFIX_TO_PRELIVE = 'DEPLOY'

        DEVELOPMENT_TO_TEST = 'DEPLOY'
        RELEASE_TO_TEST = 'DEPLOY'
        HOTFIX_TO_TEST = 'DEPLOY'

        DEVELOPMENT_TO_DEV = 'DEPLOY'
    }

    stages {
        stage('Inspection') {
            parallel {
                stage('Pre-build') {
                    steps {
                        echo "Jenkins node: ${env.NODE_NAME}"
                        echo "Operating system: ${isUnix() ? 'Unix/Linux' : 'Windows'}"

                        runCommand 'node --version'
                        runCommand 'npm --version'

                        script {
                            if (!fileExists('README.md')) {
                                error('README.md missing - checkout incomplete or wrong workspace directory')
                            }
                        }

                        echo 'Pre build inspection and precondition check. Node.js 24+ (with its npm) must be installed on the agent. E2E also needs Java and a reachable Selenium Grid.'
                    }
                }
                stage('Build tools') {
                    steps {
                        echo 'Build tools installation and preparation (setup, config)'
                        echo 'Nothing to install: node and npm are the whole toolchain, every other tool is a devDependency the Install stage brings in'
                        runCommand 'npm config get registry'
                    }
                }
            }
        }

        stage('Preparation') {
            parallel {
                stage('Install') {
                    steps {
                        echo 'Preparing the software to be built. Installation commands go here.'
                        runCommand 'npm ci'
                        echo 'Put here build configuration commands'
                        runCommand 'npm ls --all'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Cleaning command, because in some cases shared directories can have previous build garbage'
                runCommand 'npm run clean'

                echo 'Put here resource copy commands'
                echo 'Nothing to copy'

                echo 'Put here compilation commands. Can be omitted.'
                //runCommand 'npm run format:check'
                runCommand 'npm run build'
                runCommand 'npm run verify'

                echo 'Put here unit tests'
                runCommand 'npm test'

                echo 'Put here integration tests. Previous steps can be merged here.'
                runCommand 'npm run pre-integration-test'
                runCommand 'npm run integration-test'
                runCommand 'npm run post-integration-test'

                echo 'Put here mutation tests'
                echo 'Not wired in yet'

                echo 'Put here reporting builds steps can include (unit tests coverage, mutation test coverage, findbugs, vuln. checks, )'
                echo 'Containing here findbug/stopbug, check style, dependencies vulnerability checks, docs gen, etc'
                //runCommand 'npm run lint'
                runCommand 'npm run audit'
                runCommand 'npm run reports'
                runCommand 'npm run docs'

                echo 'Put here site deploy'
                echo 'Not wired to a target yet - reports/ (junit, coverage, security, sbom, dependencies, docs) is archived by post { always } below'

                echo 'Put here e2e tests'
                // pre-e2e-test / e2e-test / post-e2e-test, same shape as the integration tier.
                // jest + selenium-webdriver, maxWorkers: 1 (grid session cap).
                runCommand 'npm run pre-e2e-test'
                runCommand 'npm run e2e-test'
                runCommand 'npm run post-e2e-test'
                //runCommand 'node scripts/lifecycle.js pre-integration-test pre-e2e-test'
                runCommand 'npm run coverage'
                //runCommand 'node scripts/lifecycle.js post-integration-test post-e2e-test'

                echo 'Put here system tests'
                echo 'Put here acceptance tests'

                echo 'Put here packaging'
                runCommand 'npm run package'

                echo 'Put here local publishing'
                echo 'Nothing to publish locally: npm has no local repository, the tarballs in dist/ are the local result and the Deploy stages install them'
            }
        }

        stage('Publish') {
            parallel {
                stage('Release') {
                    when {
                        branch 'master'
                        // changeset "**/file/to/be/changed"
                    }
                    steps {
                        withCredentials([string(credentialsId: 'NPMToken', variable: 'NPM_TOKEN')]) {
                            sh 'env NPM_CONFIG_USERCONFIG=/tmp/no-such-npmrc "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm whoami'
                            sh 'env NPM_CONFIG_USERCONFIG=/tmp/no-such-npmrc "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm stage list setmy-info-less'
                        }
                    }
                    steps {
                        echo 'Put here software release steps'
                        withCredentials([
                            string(credentialsId: 'NPMToken', variable: 'NPM_TOKEN')
                        ]) {
                            runCommand 'env "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm stage publish --workspaces --dry-run'
                            runCommand 'env "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm stage publish --workspaces'
                        }
                    }
                }
                stage('Snapshot') {
                    when {
                        branch pattern: 'devel.*', comparator: 'REGEXP'
                    }
                    steps {
                        echo 'Put here software snapshot publishing steps'
                        withCredentials([
                            string(credentialsId: 'NPMToken', variable: 'NPM_TOKEN')
                        ]) {
                            //runCommand 'env "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm stage publish --workspaces --dry-run'
                            //runCommand 'env "npm_config_//registry.npmjs.org/:_authToken=$NPM_TOKEN" npm stage publish --workspaces'
                        }
                    }
                }
                stage('Release reports') {
                    when {
                        branch 'master'
                    }
                    steps {
                        echo 'Put here reports publishing steps'
                        echo 'Not wired to a target yet - reports/ is archived by post { always } below'
                    }
                }
                stage('Snapshot reports') {
                    when {
                        branch pattern: 'devel.*', comparator: 'REGEXP'
                    }
                    steps {
                        echo 'Put here reports publishing steps'
                        echo 'Not wired to a target yet - reports/ is archived by post { always } below'
                    }
                }
            }
        }
        stage('Deploy') {
            parallel {
                stage('dev') {
                    when {
                        environment name: 'DEVELOPMENT_TO_DEV', value: 'DEPLOY'
                        branch pattern: 'devel.*', comparator: 'REGEXP'
                    }
                    steps {
                        echo 'Put here software development installations steps'
                        //runCommand 'npm run deploy -- dev'
                    }
                }
                stage('test') {
                    when {
                        anyOf {
                            allOf {
                                environment name: 'DEVELOPMENT_TO_TEST', value: 'DEPLOY'
                                branch pattern: 'devel.*', comparator: 'REGEXP'
                            }
                            allOf {
                                environment name: 'RELEASE_TO_TEST', value: 'DEPLOY'
                                branch pattern: 'release.*', comparator: 'REGEXP'
                            }
                            allOf {
                                environment name: 'HOTFIX_TO_TEST', value: 'DEPLOY'
                                branch pattern: 'hotfix.*', comparator: 'REGEXP'
                            }
                        }
                    }
                    steps {
                        echo 'Put here software test installations steps'
                        //runCommand 'npm run deploy -- test'
                    }
                }
                stage('prelive') {
                    when {
                        anyOf {
                            allOf {
                                environment name: 'RELEASE_TO_PRELIVE', value: 'DEPLOY'
                                branch pattern: 'release.*', comparator: 'REGEXP'
                            }
                            allOf {
                                environment name: 'HOTFIX_TO_PRELIVE', value: 'DEPLOY'
                                branch pattern: 'hotfix.*', comparator: 'REGEXP'
                            }
                        }
                    }
                    steps {
                        echo 'Put here software prelive installations steps'
                        //runCommand 'npm run deploy -- prelive'
                    }
                }
                stage('live') {
                    when {
                        environment name: 'MASTER_TO_LIVE', value: 'DEPLOY'
                        branch 'master'
                    }
                    steps {
                        echo 'Put here software production installations steps'
                        //runCommand 'npm run deploy -- live'
                    }
                }
            }
        }
        stage('Tag') {
            when {
                environment name: 'MASTER_TO_LIVE', value: 'DEPLOY'
                branch 'master'
            }
            steps {
                runCommand 'npm run smi-new-tag'
            }
        }
    }

    post {
        always {
            catchError(buildResult: null, stageResult: null) {
                runCommand 'node scripts/lifecycle.js post-integration-test post-e2e-test'
            }
            junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
            archiveArtifacts artifacts: 'dist/*.tgz, dist/*.sha256, reports/**, build/servers/*.json', allowEmptyArchive: true, fingerprint: true
        }

        success {
            emailext (
                subject: "Jenkins job: $JOB_NAME, build: $BUILD_NUMBER type: SUCCESSFUL",
                body: "Job: $JOB_NAME, build: $BUILD_NUMBER, url: ${env.BUILD_URL}, git: ${env.GIT_URL}, branch: ${env.GIT_BRANCH} SUCCESSFUL post step",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }

        failure {
            emailext (
                subject: "Jenkins job: $JOB_NAME, build: $BUILD_NUMBER type: FAILED",
                body: "Job: $JOB_NAME, build: $BUILD_NUMBER, url: ${env.BUILD_URL}, git: ${env.GIT_URL}, branch: ${env.GIT_BRANCH}  FAILED post step",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}
