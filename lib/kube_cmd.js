var util = require('util');
const exec = util.promisify(require('child_process').exec);
function kubeCMD() {
    this.get_pods = async function(namespace) {
      const { stdout, stderr } = await exec('kubectl -n ' + namespace + ' get pods');
      return {output: stdout, error: stderr};
    }

    this.get_logs = async function(namespace, pod_id) {
      // need to include a optional param when there is a multiple containers running in a single pod
      const { stdout, stderr } = await exec('kubectl -n ' + namespace + ' logs -f ' + pod_id);
      return {output: stdout, error: stderr};
    }
}

module.exports = new kubeCMD();
