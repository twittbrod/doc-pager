#! /usr/bin/env bash

echo Please provide the following details on your lab environment.
echo
echo "What is the address of your Mantl Control Server?  "
echo "eg: control.mantl.internet.com"
read control_address
echo
echo "What is the username for your Mantl account?  "
read mantl_user
echo
echo "What is the password for your Mantl account?  "
read -s mantl_password
echo
echo "What is the Lab Application Domain?  "
read mantl_domain
echo
echo "What folder name do you want to use?"
read folder_name
echo
echo "What deployment name do you want to use?"
read deployment_name
echo
echo "*We need some details on your Mongo instance.*"
echo
echo "What is your MongoDB URL?"
read mongo_url
echo
#echo "What is the service address for Mongo?"
#read mongo_service
#echo
echo "*We need some details on your Spark app.*"
echo
echo "What is your Spark client ID?"
read -s spark_clientId
echo
echo "What is your Spark client secret?"
read -s spark_clientSecret
echo



cp sample-doc-pager.json deploy-doc-pager.json
#sed -i "" -e "s/DOCKERUSER/$docker_username/g" $docker_username-demoapp.json
sed -i "" -e "s/ENV_TOKEN_SPARK_CLIENT/$spark_clientId/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_SECRET_SPARK_CLIENT/$spark_clientSecret/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_MANTL_CONTROL/$control_address/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_DEPLOYMENT_NAME/$deployment_name/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_FOLDER_NAME/$folder_name/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_APP_DOMAIN/$mantl_domain/g" deploy-doc-pager.json
sed -i "" -e "s/ENV_MONGO_URL/$mongo_url/g" deploy-doc-pager.json
#sed -i "" -e "s/ENV_MONGO_SERVICE/$mongo_service/g" deploy-doc-pager.json

echo " "
echo "***************************************************"
echo "Installing the docpagerapp"
curl -k -X POST -u $mantl_user:$mantl_password https://$control_address:8080/v2/apps \
-H "Content-type: application/json" \
-d @deploy-doc-pager.json \
| python -m json.tool

echo "***************************************************"
echo

echo Installed

echo
echo "You can also watch the progress from the GUI at: "
echo
echo "https://$control_address/marathon"
echo