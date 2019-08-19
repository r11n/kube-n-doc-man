# Docker and Kubernetes manager
A simple node app to work to connect to kubernetes and docker using the `child_process`.
**note:** Works only for the pods or containers on the hosted machine.
## Supported Features:
### Kubernetes:
* see pods in a given namespace (`/pods/:namespace`)
* see logs in a single container pods that are killed or completed(`/logs/:pod-id`)
### Docker:
* TODO