export default{
    template:
    `<tr>
        <td>{{number}}</td>
        <td v-for="td in content">{{td}}</td>
        <td class="text-right">
            <button class="btn btn-danger" @click="delete_tr()">Удалить</button>
            <button class="btn btn-primary" @click="edit_tr()">Редактировать</button>
        </td>
    </tr>`,
    props: ['item', 'number'],
    computed: {
        content() {
            let arr = [];
            console.log(this.item);
            for (let key in this.item) {
                if (!['id', 'created_at', 'updated_at'].includes(key))
                    arr.push(this.item[key]);
            }
            return arr;
        }
    },
    methods: {
        delete_tr() {
            this.$emit('delete_tr', this.item);
        },
        edit_tr() {
            for(let key in this.item){
                if(key.includes('_at')){
                    this.item[key] = this.item[key].replace(' ', 'T');
                }
            }
            this.$emit('edit_tr', this.item)
        }
    }
}