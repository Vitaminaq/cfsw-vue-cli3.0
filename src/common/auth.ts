import { Vue, Component } from 'vue-property-decorator';
import Cookies from 'js-cookie';

@Component
export class MyMixin extends Vue {
    get isLogin () {
        return !!Cookies.get('token') && !!Cookies.get('nickname');
    }
}
