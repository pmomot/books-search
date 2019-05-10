import '../style/index.scss';
import { addN } from './utils/add-n';
import { App } from './app';

(function(){
    // task 1
    const addEight = addN(8);
    console.log(addEight(7));
    console.log(addEight(100));
    //

    document.addEventListener('DOMContentLoaded', () => {
        const app = new App();
    });
})();
