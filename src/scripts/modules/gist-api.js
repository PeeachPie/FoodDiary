import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

export default class GistApi {
  constructor (token, id) {
    this.id = id
    this.token = token
    this.octokit = new Octokit({ auth : this.token })
  }

  async putKey(name, key) {
    try {
      const keys = await this.getKeys()
      keys[name] = key;
      await this.octokit.request(
        `POST /gists/${this.id}`,
        {
          public: false,
          files: {
            "keys.json": {
              content: JSON.stringify(keys),
            },
          },
        }
      );
    } catch (e) { console.log(e) }
  }

  async get() {
    try {
      return await this.octokit.request(`GET /gists/${this.id}`, {
        gist_id: this.id
      })
    } catch (e) { console.log(e) }
  }

  async getKeys() {
    try {
      return JSON.parse((await this.get()).data.files['keys.json'].content)
    } catch (e) { console.log(e) }
  }

  async getKey(name) {
    try {
      return (await this.getKeys())[name]
    } catch (e) { console.log(e) }
  }
}