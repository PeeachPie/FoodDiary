import GistApi from "./gist-api.js";

export default class IPFSApi {
  constructor(token, id) {
    this.node = null;
    this.decoder = new TextDecoder();
    this.token = token
    this.id = id
  }

  async create() {
    try {
      this.node = await Ipfs.create();
      this.gist = await new GistApi(this.token, this.id)
    }
    catch (e) { console.log (e) }
  }

  async get(name) {
    try {
      const stream = await this.node.cat(await this.gist.getKey(name));
      let data = ""
      for await (const chunk of stream) {
        data += this.decoder.decode(chunk, { stream: true });
      }
      return data;
    }
    catch (e) { console.log (e) };
  }

  async post(data, name) {
    try { 
      const res = await this.node.add(data);
      this.gist.putKey(name, res.path)
    }
    catch (e) { console.log (e) };
  }
}
