// import chaos from 'k6/x/chaos';
// import { Pods } from 'k6/x/chaos/k8s';
// import { Podkillers } from 'k6/x/chaos/experiments';
import { Kubernetes } from 'k6/x/kubernetes';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const namespace = "default";

export default function () {

  // const kubernetes = new Kubernetes({
  //   // config_path: "/path/to/kube/config", ~/.kube/config by default
  // });

  // console.log(`${chaos.version}`);

  // const podkiller = new Podkillers();

  // podkiller.killPodLike('default', 'nginx');

  // const pods = kubernetes.pods.list();

  // console.log(`${pods.length} Pods found:`);

  // Working Code
  // const p = new Podkillers();
  // // p.killPod('default','nginx-6799fc88d8-pj9cf');
  // p.killRandomPod('default');
  // p.killPodLike('default','nginx'); 

  // Trying Pods

    const p = new Pods();
    const namespace = 'default';
    p.killByName(null,namespace,'nginx-6799fc88d8-pj9cf');

  

  

}

export function handleSummary(data) {
  return {
      'stdout': textSummary(data, { indent: ' ', enableColors: true}) + new Podkillers().generateSummary(),
  };
}



