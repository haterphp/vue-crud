import Vue from './vue.esm.js';
import AppComponent from '../../components/app.js';
import ModalContentCreate from '../../components/modal.js';

let host = "http://apitest.larin.site/photo-service/api/";
let f = async (url, method = 'get', data = []) => {
    method = method.toUpperCase();

    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (["POST", "PATCH"].includes(method)) {
        options.body = JSON.stringify(data);
    }

    let result = await fetch(`${host}${url}`, options);
    if (method === 'DELETE') {
        return true;
    }
    return await result.json();
}


window.app = new Vue({
    el: '#app',
    components: {
        'modal-content-create': ModalContentCreate,
        'app-component': AppComponent
    },
    data: {
        contents: [],
        type: null,
        appState: null,
        currentObj: null,
        fields: {
            country: [
                {
                    label: 'Название',
                    name: "name",
                    value: "",
                    type: 'input',
                    errors: null
                },
                {
                    label: 'Код',
                    name: "code",
                    value: "",
                    type: "input",
                    errors: null
                },
            ],
            task: [
                {
                    label: 'Название',
                    name: "name",
                    value: "",
                    type: "input",
                    errors: null
                },
                {
                    label: 'Приоритет',
                    name: "priority",
                    value: "",
                    type: 'select',
                    options: {
                        low: 'Низкий',
                        normal: 'Нормальный',
                        high: 'Высокий',
                    },
                    errors: null
                },
                {
                    label: 'Срок Сдачи',
                    name: "finished_at",
                    value: "",
                    type: "datetime-local",
                    errors: null
                },
            ]
        }
    },
    async mounted(){
        this.type = $('#app').data('document-type')
        await this.getContent(this.type);
    },
    methods: {
        async getContent(type) {
            this.contents = [];
            let result = await f(`${type}`);
            this.contents.push(...result);
        },
        closeModal() {
            $('.modal').modal('hide');
            this.contents.forEach(e=>{
                for(let key in e){
                    if(key.includes('_at')){
                        e[key] = e[key].replace('T', ' ');
                    }
                }
            })
            this.fields[this.type].forEach(e => e.value = "");
            this.currentObj = null;
        },
        async addContent(obj) {

            let arr = {};
            let type = this.type;
            obj.forEach(e => {
                arr[e.name] = e.value;
                if (e.type === 'datetime-local') {
                    arr[e.name] = `${e.value}:00`;
                    arr[e.name] = arr[e.name].replace('T', ' ');
                }
            })
            console.log(arr);
            let result = [];
            if (!this.currentObj) {
                result = await f(`${type}`, 'post', arr);
            } else {
                result = await f(`${type}/${this.currentObj.id}`, 'patch', arr);
            }

            if (result.id) {
                $('.modal').modal('hide');
                await this.getContent(type);
                return true;
            }
            for (let key in result) {
                console.log(this.fields[type])
                let field = this.fields[type].find(item => item.name === key);
                field.errors = result[key];
            }
            setTimeout(() => {
                for (let key in result) {
                    console.log(this.fields[type])
                    let field = this.fields[type].find(item => item.name === key);
                    field.errors = null;
                }
            }, 2000)

        },
        async deleteContent(obj) {
            let result = await f(`${this.type}/${obj.id}`, 'delete');
            if (result) {
                await this.getContent(this.type);
            }
        },
        openEdit(obj) {
            $('.modal').modal('show');
            let item = this.contents.find(item => item.id === obj.id);
            this.fields[this.type].forEach(e => {
                e.value = item[e.name];
            })
            this.currentObj = obj;
        },
        openCreate() {
            $('.modal').modal('show');
        }
    }
});