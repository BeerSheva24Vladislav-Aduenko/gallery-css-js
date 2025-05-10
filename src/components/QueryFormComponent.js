export default class QueryFormComponent {
    constructor(parentElement, submitter, fields) {
      this.parentElement = parentElement;
      this.submitter = submitter;
      this.fields = fields;
      this.render();
    }
  
    render() {
      this.parentElement.innerHTML = `
        <form class="query-form">
          ${this.fields
            .map(field => {
              const { name, type, min, max } = field;
              return `
                <label>
                  ${name}:
                  <input 
                    type="${type}" 
                    name="${name}" 
                    ${type === "number" && min !== undefined ? `min="${min}"` : ""}
                    ${type === "number" && max !== undefined ? `max="${max}"` : ""}
                    required
                  >
                </label>
              `;
            })
            .join("")}
          <button type="submit">Submit</button>
        </form>
      `;
  
      const form = this.parentElement.querySelector(".query-form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const submittedObj = {};

        formData.forEach((value, key) => {
          submittedObj[key] = value;
        });
        this.submitter(submittedObj);
      });
    }
  }