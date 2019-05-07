import '../style/index.scss';
import { addN } from './add-n';

(function(){
    // task 1
    const addEight = addN(8);
    console.log(addEight(7));
    console.log(addEight(100));
    //

    document.addEventListener('DOMContentLoaded', () => {
        console.log('app started');
    });
})();
