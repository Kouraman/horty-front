@echo off

cd namespace
kubectl apply -f bbhorty.yaml
cd ..

cd ingress
kubectl apply -f ingress.yaml
cd ..


cd deployment
kubectl apply -f deployment.yaml
cd ..

cd hpa
kubectl apply -f hpa.yaml
cd ..

cd service
kubectl apply -f service.yaml
cd ..
