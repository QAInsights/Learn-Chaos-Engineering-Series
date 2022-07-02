```
helm repo add kubeinvaders https://lucky-sideburn.github.io/helm-charts/

kubectl create namespace kubeinvaders

kubectl create namespace perf-demo



helm install kubeinvaders --set-string target_namespace="perf-demo" \
-n kubeinvaders kubeinvaders/kubeinvaders --set ingress.hostName=perfkube.pod --set image.tag=v1.9

helm repo update

helm install nginx-ingress ingress-nginx/ingress-nginx

# annotate the ingress
kubernetes.io/ingress.class: "nginx"

k get ingresses.networking.k8s.io -n kubeinvaders

# Edit /etc/hosts and add the IP of ingress
```