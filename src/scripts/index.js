import IPFSApi from "./modules/ipfs-api.js";
import d from "../default.json" assert {type : "json"}
(async () => {
  const api = new IPFSApi(d.TOKEN, d.GISTID)
  await api.create()
  // await api.post('{i3f3ifi3rfjirgj2grkgfkrofkhfeorgerfjkfqoefkeofjreghrg}', 'mark')
  // const res = await api.get('mark')
  // console.log(res)
})();
