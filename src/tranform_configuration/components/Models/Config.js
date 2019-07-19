class Config {
  constructor() {
    this.name = "";
    this.active = true;
    this.cron_trigger = "";
    this.project_id ="";
    this.filter = {
      collector: {
        doc_status: "350",
        batch_status: "",
        doc_set_status: ""
      },
      transform: {
        pattern: ""
      }
    };
    this.rules = {
      common: [],
      content: {}
    };
    this.dictionary = [
      
    ];
  }
}

export default Config;
