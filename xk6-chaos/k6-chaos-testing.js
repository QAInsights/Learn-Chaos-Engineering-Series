import { Kubernetes } from 'k6/x/kubernetes';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { sleep } from 'k6';

const namespace = "default";

export default function () {

  const kubernetesClient = new Kubernetes({
        // config_path: "/path/to/kube/config", ~/.kube/config by default
  });
  const options = {
    namespace: "default"
  }
  // Print the number of pods
  console.log("The number of pods in " + options.namespace + " namespace is " + kubernetesClient.pods.list("default").length)  

  // Killing a random pod
  let podsList = getPodNames("default", kubernetesClient)    
  const podName = podsList[Math.floor(Math.random() * kubernetesClient.pods.list("default").length)]

  try {
    kubernetesClient.pods.kill(podName, options.namespace)
    console.log(podName + "has been killed successfully.");
  } catch (error) {
    console.log(error.value);
  }
  
  sleep(5);

  // Killing a deployment
  try {
    kubernetesClient.deployments.delete("nginx",options.namespace)
    console.log("Deployment has been killed successfully.");
  } catch (error) {
    console.log(error.value.err_status.message);
  }
  
  sleep(5);

  // Killing a service
  try {
    kubernetesClient.services.delete("nginx", options.namespace)
    console.log("Service has been killed successfully.");    
  } catch (error) {
    console.log(error.value.err_status.message);
  }
}

export function handleSummary(data) {
  return {
      'stdout': textSummary(data, { indent: ' ', enableColors: true}),
  };
}

function getPodNames(nameSpace, kubernetesClient) {
    return kubernetesClient.pods.list(nameSpace).map(function(pod){
      return pod.name
    })
  }