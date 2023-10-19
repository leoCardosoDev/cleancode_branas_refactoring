import Registry from "./register"

export default function inject (name: string) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = new Proxy({}, {
      get (target: any, propertyKey: string, receiver: any) {
        const dependecy = Registry.getInstance().inject(name)
        return dependecy[propertyKey]
      }
    })
  }
}
