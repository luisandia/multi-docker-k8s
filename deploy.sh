docker build -t luisandia/multi-client:latest -t luisandia/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t luisandia/multi-server:latest -t luisandia/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t luisandia/multi-worker:latest -t luisandia/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push luisandia/multi-client:latest
docker push luisandia/multi-client:$SHA
docker push luisandia/multi-server:latest
docker push luisandia/multi-server:$SHA
docker push luisandia/multi-worker:latest
docker push luisandia/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=luisandia/multi-server:$SHA
kubectl set image deployments/client-deployment client=luisandia/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=luisandia/multi-worker:$SHA