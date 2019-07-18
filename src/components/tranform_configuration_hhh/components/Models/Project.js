
class Project {
	constructor() {
		this.project_id = new Date().getTime();
		this.name = '';
		this.active = true;
		this.filter = {
			collector: {
				doc_status: "final",
				batch_status: "",
				doc_set_status: ""
			},
			transform: {
				pattern: ""
			}
		}
		this.rules = {
			common: [],
			content: {}
		}
		this.dictionary = []
	}
}

export default Project