const http = require("http");
const fs = require("fs");
const path = require("path");
let countOnline = 0;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    function writeHTML(file){
        var Excel = require('exceljs');


        let obj = {
            dayOfWeek: [],         // день недели
            number: [],        // номер урока
            time: [],      // время урока //название класса как массив (например 7в - 7,в)
            discipline: [],  // предмет, класс
            classRoom: [], // кабинет
            headings: [], // азвания классов
            // teacher:[],     // учитель
            // distant:false   // на дистанте (да / нет)
            anotherDisciplines: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],

            anotherClassrooms: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],
        };

        let disciplineObj = {
            coloumns: [
                [],
                [],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
            ],
        }

        var wb = new Excel.Workbook();
        var filePath = path.resolve(__dirname, `${file}`);
        let stringResponse = "";
        let z;

        let workbookPromise = wb.xlsx.readFile(filePath).then(function () {

            let i;
            let j;
            let k = 0;
            let l;
            let valueOfCell = [];

            var checkHeadingsClassA = /\dа/;
            var checkHeadingsClassB = /\dб/;
            var checkHeadingsClassC = /\dв/;

            let firstValue;

            // получение данных с определеного листа
            var sh = wb.getWorksheet("1");

            // запись в файл (не нужно пока)
            //wb.xlsx.writeFile("sample2.xlsx");

            // получение значиений с по всем строкам и столбцам
            for (i = 1; i <= 15; i++) {
                //console.log(" СТРОКА №", i);

                // if (i==3){
                //     if (j==null){
                //
                //     }
                // }

                l = 1;
                for (j = 1; j <= 20; j++) {

                    // 1 столбец ноиер урока
                    valueOfCell[j] = sh.getRow(i).getCell(j).value;
                    if ((j - 1) == 0) {
                        k = 0;
                    } else {
                        k++;
                    }

                    if (i == 1) {
                        firstValue = valueOfCell[j];
                    }

                    // if (i==3 && valueOfCell[j]==null){
                    //     valueOfCell[j] = "!";
                    //     console.log(valueOfCell[j], j, "Рома");
                    // }

                    if ((checkHeadingsClassA.test(valueOfCell[j])) == true
                        || (checkHeadingsClassB.test(valueOfCell[j])) == true
                        || (checkHeadingsClassC.test(valueOfCell[j])) == true) {
                        obj.headings.push(valueOfCell[j]);
                    }


                    switch (k) {
                        case (0): {
                            obj.dayOfWeek[i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }
                        case (1): {
                            obj.number[i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }
                        case (2): {
                            obj.time[i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }
                        case (3): {
                            obj.discipline[i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }
                        case (4): {
                            obj.classRoom[i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (5): {
                            obj.anotherDisciplines[0][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (6): {
                            obj.anotherClassrooms[0][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (7): {
                            obj.anotherDisciplines[1][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (8): {
                            obj.anotherClassrooms[1][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (9): {
                            obj.anotherDisciplines[2][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (10): {
                            obj.anotherClassrooms[2][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (11): {
                            obj.anotherDisciplines[3][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (12): {
                            obj.anotherClassrooms[3][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (13): {
                            obj.anotherDisciplines[4][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (14): {
                            obj.anotherClassrooms[4][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (15): {
                            obj.anotherDisciplines[5][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }

                        case (16): {
                            obj.anotherClassrooms[5][i] = valueOfCell[j];
                            console.log('k', k);
                            break;
                        }


                        default:
                            break;
                    }
                }

                // if (k==2){
                //     k=1;
                //     l++;
                // }
            }


            console.log("obj", obj);

            for (let i = 0; i < obj.discipline.length; i++) {
                if (obj.discipline[i] == null || obj.discipline[i] == undefined) {
                    obj.discipline.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < obj.classRoom.length; i++) {
                if (obj.classRoom[i] == null || obj.classRoom[i] == undefined) {
                    obj.classRoom.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < obj.time.length; i++) {
                if (obj.time[i] == null || obj.time[i] == undefined) {
                    obj.time.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < obj.number.length; i++) {
                if (obj.number[i] == null || obj.number[i] == undefined) {
                    obj.number.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < obj.dayOfWeek.length; i++) {
                if (obj.dayOfWeek[i] == null || obj.dayOfWeek[i] == undefined) {
                    obj.dayOfWeek.splice(i, 1);
                    i--;
                }
            }

            // for (let i = 0; i<obj.anotherDisciplines.length; i++){
            //
            //     for(let x = 0; x<obj.anotherDisciplines[i].length; x++){
            //         if (obj.anotherDisciplines[i][x]==null || obj.anotherDisciplines[i][x]==undefined){
            //             obj.anotherDisciplines[i].splice(x,1);
            //
            //         }
            //     }
            //
            //     i--;
            // }

            Array.prototype.clean = function (deleteValue) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == deleteValue) {
                        this.splice(i, 1);
                        i--;
                    }
                }
                return this;
            };

            for (let i = 0; i < obj.anotherDisciplines.length; i++) {
                obj.anotherDisciplines[i].clean(undefined);
                obj.anotherDisciplines[i].clean(null);
            }

            obj.time.shift();
            for (let i = 0; i < obj.anotherDisciplines.length; i++) {
                obj.anotherDisciplines[i].shift();
            }

            for (let i = 0; i < obj.anotherClassrooms.length; i++) {
                obj.anotherClassrooms[i].clean(undefined);
                obj.anotherClassrooms[i].clean(null);
            }


            let countColoumns = 0;

            for (let i = 1; i < obj.discipline.length; i++) {
                var checkHeadingA = /\dа/;
                var checkHeadingB = /\dб/;
                var checkHeadingC = /\dв/;


                if (checkHeadingA.test(obj.discipline[i]) == true || checkHeadingB.test(obj.discipline[i]) == true || checkHeadingC.test(obj.discipline[i]) == true) {
                    countColoumns += 1;
                    i++;
                    console.log(countColoumns);
                    console.log("Произошла смена!");
                }

                console.log(countColoumns);

                disciplineObj.coloumns[countColoumns].push(obj.discipline[i]);

            } // сортировка уроков по колонкам в obj2.disciplines

            // function eraser (i){
            //     splice(i);
            // }


            console.log("obj.discipline", obj.discipline);
            console.log("obj.classRoom", obj.classRoom);
            console.log("obj.time", obj.time);
            console.log("obj.number", obj.number);
            console.log("obj.dayOfWeek", obj.dayOfWeek);


            // for (z = 1;z<=7;z++){
            //     stringResponse =stringResponse + obj[1,1].dayOfWeek[z]+ " "+obj[1,1].number[z]+" "+obj[1,1].discipline[z]+"\n";
            //
            // }

            for (z = 1; z <= 35; z++) {
                stringResponse = stringResponse + obj.dayOfWeek[z] + " " + obj.number[z] + " " + obj.time[z] + ' ' + obj.discipline[z] + ' ' + obj.classRoom[z] + "\n";

            }

            console.log(obj.headings);
            console.log(disciplineObj);
            console.log('another:', obj.anotherDisciplines);
            console.log(obj.anotherClassrooms);
            // console.log(firstValue);


            //console.log(stringResponse);



            function write(btnI) {
                alert(`Вы нажали на ${obj.headings[btnI]}`);
            }

            for (let i = 0; i < obj.headings.length; i++) {
                res.write(`

                    <script>
                        let zgolovokIzmeneny${[i]} = document.getElementById('izmRasp');
                        console.log(zgolovokIzmeneny${[i]});
                        let a${[i]} = document.createElement("button");
                        let zagolovokIzmenenyClass${[i]} = document.getElementById('now-show-class');
                        a${[i]}.textContent = '${obj.headings[i]}';
                        zagolovokIzmenenyClass${[i]}.textContent = '${obj.headings[0]}';
                        
                        
                        let firstDiscipline${[i]} = document.getElementById('one');
                        let secondDiscipline${[i]} = document.getElementById('two');
                        let thirdDiscipline${[i]} = document.getElementById('three');
                        let fourthDiscipline${[i]} = document.getElementById('four');
                        let fifthDiscipline${[i]} = document.getElementById('five');
                        let sixthDiscipline${[i]} = document.getElementById('six');
                        console.log(firstDiscipline${[i]});
                        let firstKab${[i]} = document.getElementById('oneKab');
                        let secondKab${[i]} = document.getElementById('twoKab');
                        let thirdKab${[i]} = document.getElementById('threeKab');
                        let fourthKab${[i]} = document.getElementById('fourKab');
                        let fifthKab${[i]} = document.getElementById('fiveKab');
                        let sixthKab${[i]} = document.getElementById('sixKab');
                        
                        zgolovokIzmeneny${[i]}.append(a${[i]});
                        firstDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][0] ? disciplineObj.coloumns[0][0] : ''}';
                        secondDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][1] ? disciplineObj.coloumns[0][1] : ''}';
                        thirdDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][2] ? disciplineObj.coloumns[0][2] : ''}';
                        fourthDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][3] ? disciplineObj.coloumns[0][3] : ''}';
                        fifthDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][4] ? disciplineObj.coloumns[0][4] : ''}';
                        sixthDiscipline${[i]}.textContent = '${disciplineObj.coloumns[0][5] ? disciplineObj.coloumns[0][5] : ''}';
                        
                        firstKab${[i]}.textContent = '${obj.classRoom[0] ? obj.classRoom[0] : '    '}';
                        secondKab${[i]}.textContent = '${obj.classRoom[1] ? obj.classRoom[1] : '    '}';
                        thirdKab${[i]}.textContent = '${obj.classRoom[2] ? obj.classRoom[2] : '    '}';
                        fourthKab${[i]}.textContent = '${obj.classRoom[3] ? obj.classRoom[3] : '    '}';
                        fifthKab${[i]}.textContent = '${obj.classRoom[4] ? obj.classRoom[4] : '    '}';
                        sixthKab${[i]}.textContent = '${obj.classRoom[5] ? obj.classRoom[5] : '    '}';
                        
                        const checkA${[i]} = '7а';
                        const checkB${[i]} = '7б';
                        const checkC${[i]} = '7в';
                        
                        // function checkClass(class){
                        //     if (class.textContent == 'Рома'){
                        //         console.log('это Рома');
                        //     }
                        // }
                        
                        a${[i]}.addEventListener('click', ()=>{
                            zagolovokIzmenenyClass${[i]}.textContent = '${obj.headings[i]}';
                        })
                    </script>
            `);
            } // вывод классов через цикл, берущий за основу колличество классов в obj.headings

            res.write(`
                <script>
                    let oneDiscipline = document.getElementById('one');
                    let twoDiscipline = document.getElementById('two');
                    let threeDiscipline = document.getElementById('three');
                    let fourDiscipline = document.getElementById('four');
                    let fiveDiscipline = document.getElementById('five');
                    let sixDiscipline = document.getElementById('six');
                    
                    let zgolovokIzmenenyV2 = document.getElementById('izmRasp');
                    
                    let firstKabV2${[i]} = document.getElementById('oneKab');
                    let secondKabV2${[i]} = document.getElementById('twoKab');
                    let thirdKabV2${[i]} = document.getElementById('threeKab');
                    let fourthKabV2${[i]} = document.getElementById('fourKab');
                    let fifthKabV2${[i]} = document.getElementById('fiveKab');
                    let sixthKabV2${[i]} = document.getElementById('sixKab');
                    
                    let buttons = document.querySelectorAll('button');
                    console.log(buttons);
                    let btn1 = buttons[0];
                    let btn2 = buttons[1] ? buttons[1] : null;
                    let btn3 = buttons[2] ? buttons[2] : null;
                    let btn4 = buttons[3] ? buttons[3] : null;
                    let btn5 = buttons[4] ? buttons[4] : null;
                    let btn6 = buttons[5] ? buttons[5] : null;
                    let btn7 = buttons[6] ? buttons[6] : null;
                    let btn8 = buttons[7] ? buttons[7] : null;
                    let btn9 = buttons[8] ? buttons[8] : null;
                    let btn10 = buttons[9] ? buttons[9] : null;
                    
                    if (btn1!=null){
                        btn1.addEventListener('click', ()=>{
                            oneDiscipline.textContent = '${disciplineObj.coloumns[0][0] ? disciplineObj.coloumns[0][0] : ''}';
                            twoDiscipline.textContent = '${disciplineObj.coloumns[0][1] ? disciplineObj.coloumns[0][1] : ''}';
                            threeDiscipline.textContent = '${disciplineObj.coloumns[0][2] ? disciplineObj.coloumns[0][2] : ''}';
                            fourDiscipline.textContent = '${disciplineObj.coloumns[0][3] ? disciplineObj.coloumns[0][3] : ''}';
                            fiveDiscipline.textContent = '${disciplineObj.coloumns[0][4] ? disciplineObj.coloumns[0][4] : ''}';
                            sixDiscipline.textContent = '${disciplineObj.coloumns[0][5] ? disciplineObj.coloumns[0][5] : ''}';
                        
                            firstKabV2${[i]}.textContent = '${obj.classRoom[0] ? obj.classRoom[0] : ''}';
                            secondKabV2${[i]}.textContent = '${obj.classRoom[1] ? obj.classRoom[1] : ''}';
                            thirdKabV2${[i]}.textContent = '${obj.classRoom[2] ? obj.classRoom[2] : ''}';
                            fourthKabV2${[i]}.textContent = '${obj.classRoom[3] ? obj.classRoom[3] : ''}';
                            fifthKabV2${[i]}.textContent = '${obj.classRoom[4] ? obj.classRoom[4] : ''}';
                            sixthKabV2${[i]}.textContent = '${obj.classRoom[5] ? obj.classRoom[5] : ''}';
                        })
                    }
                    
                    
                    
                    
                    if (btn2!=null){
                        btn2.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[0][0] ? obj.anotherDisciplines[0][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[0][1] ? obj.anotherDisciplines[0][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[0][2] ? obj.anotherDisciplines[0][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[0][3] ? obj.anotherDisciplines[0][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[0][4] ? obj.anotherDisciplines[0][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[0][5] ? obj.anotherDisciplines[0][5] : ''}';
                        
                        firstKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][0] ? obj.anotherClassrooms[0][0] : ''}';
                        secondKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][1] ? obj.anotherClassrooms[0][1] : ''}';
                        thirdKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][2] ? obj.anotherClassrooms[0][2] : ''}';
                        fourthKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][3] ? obj.anotherClassrooms[0][3] : ''}';
                        fifthKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][4] ? obj.anotherClassrooms[0][4] : ''}';
                        sixthKabV2${[i]}.textContent = '${obj.anotherClassrooms[0][5] ? obj.anotherClassrooms[0][5] : ''}';
                        })
                    }
                    
                    if (btn3!=null){
                        btn3.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[1][0] ? obj.anotherDisciplines[1][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[1][1] ? obj.anotherDisciplines[1][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[1][2] ? obj.anotherDisciplines[1][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[1][3] ? obj.anotherDisciplines[1][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[1][4] ? obj.anotherDisciplines[1][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[1][5] ? obj.anotherDisciplines[1][5] : ''}';
                        
                        firstKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][0] ? obj.anotherClassrooms[1][0] : ''}';
                        secondKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][1] ? obj.anotherClassrooms[1][1] : ''}';
                        thirdKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][2] ? obj.anotherClassrooms[1][2] : ''}';
                        fourthKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][3] ? obj.anotherClassrooms[1][3] : ''}';
                        fifthKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][4] ? obj.anotherClassrooms[1][4] : ''}';
                        sixthKabV2${[i]}.textContent = '${obj.anotherClassrooms[1][5] ? obj.anotherClassrooms[1][5] : ''}';
                        })
                    }
                    
                    if (btn4!=null){
                        btn4.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[2][0] ? obj.anotherDisciplines[2][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[2][1] ? obj.anotherDisciplines[2][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[2][2] ? obj.anotherDisciplines[2][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[2][3] ? obj.anotherDisciplines[2][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[2][4] ? obj.anotherDisciplines[2][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[2][5] ? obj.anotherDisciplines[2][5] : ''}';
                        
                        firstKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][0] ? obj.anotherClassrooms[2][0] : ''}';
                        secondKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][1] ? obj.anotherClassrooms[2][1] : ''}';
                        thirdKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][2] ? obj.anotherClassrooms[2][2] : ''}';
                        fourthKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][3] ? obj.anotherClassrooms[2][3] : ''}';
                        fifthKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][4] ? obj.anotherClassrooms[2][4] : ''}';
                        sixthKabV2${[i]}.textContent = '${obj.anotherClassrooms[2][5] ? obj.anotherClassrooms[2][5] : ''}';
                        })
                    }
                    
                    if (btn5!=null){
                        btn5.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[3][0] ? obj.anotherDisciplines[3][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[3][1] ? obj.anotherDisciplines[3][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[3][2] ? obj.anotherDisciplines[3][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[3][3] ? obj.anotherDisciplines[3][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[3][4] ? obj.anotherDisciplines[3][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[3][5] ? obj.anotherDisciplines[3][5] : ''}';
                        
                        firstKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][0] ? obj.anotherClassrooms[4][0] : ''}';
                        secondKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][1] ? obj.anotherClassrooms[4][1] : ''}';
                        thirdKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][2] ? obj.anotherClassrooms[4][2] : ''}';
                        fourthKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][3] ? obj.anotherClassrooms[4][3] : ''}';
                        fifthKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][4] ? obj.anotherClassrooms[4][4] : ''}';
                        sixthKabV2${[i]}.textContent = '${obj.anotherClassrooms[4][5] ? obj.anotherClassrooms[4][5] : ''}';
                        })
                    }
                    
                    if (btn6!=null){
                        btn6.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[4][0] ? obj.anotherDisciplines[4][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[4][1] ? obj.anotherDisciplines[4][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[4][2] ? obj.anotherDisciplines[4][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[4][3] ? obj.anotherDisciplines[4][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[4][4] ? obj.anotherDisciplines[4][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[4][5] ? obj.anotherDisciplines[4][5] : ''}';
                        })
                    }
                    
                    if (btn7!=null){
                        btn7.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${obj.anotherDisciplines[5][0] ? obj.anotherDisciplines[5][0] : ''}';
                        twoDiscipline.textContent = '${obj.anotherDisciplines[5][1] ? obj.anotherDisciplines[5][1] : ''}';
                        threeDiscipline.textContent = '${obj.anotherDisciplines[5][2] ? obj.anotherDisciplines[5][2] : ''}';
                        fourDiscipline.textContent = '${obj.anotherDisciplines[5][3] ? obj.anotherDisciplines[5][3] : ''}';
                        fiveDiscipline.textContent = '${obj.anotherDisciplines[5][4] ? obj.anotherDisciplines[5][4] : ''}';
                        sixDiscipline.textContent = '${obj.anotherDisciplines[5][5] ? obj.anotherDisciplines[5][5] : ''}';
                        
                        firstKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][0] ? obj.anotherClassrooms[5][0] : ''}';
                        secondKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][1] ? obj.anotherClassrooms[5][1] : ''}';
                        thirdKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][2] ? obj.anotherClassrooms[5][2] : ''}';
                        fourthKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][3] ? obj.anotherClassrooms[5][3] : ''}';
                        fifthKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][4] ? obj.anotherClassrooms[5][4] : ''}';
                        sixthKabV2${[i]}.textContent = '${obj.anotherClassrooms[5][5] ? obj.anotherClassrooms[5][5] : ''}';
                        })
                    }
                </script>
            `)






            // var NowDate = new Date();
            // var NowDay = NowDate.getDay();
            //
            // const motivationArr = ['Пытаться добиться успеха, ничего не делая – то же самое, что пытаться собрать урожай там, где вы ничего не сеяли. (Давид Блай)',
            // 'Если вы работаете над поставленными целями, то эти цели будут работать на вас. (Д. Рон)', 'Проблема в том, что, не рискуя, мы рискуем в сто раз больше. (Марк Аврелий)',
            //     'Только поступки что-то меняют. Если нет поступков, то все остается прежним. (Лес Браун)',
            //     'Самая большая ошибка, которую мы можем совершить – постоянная боязнь совершить ошибку. (Элберт Хаббард)',
            //     'Чтобы стать успешным, достаточно сделать весьма немногое из всего того, что в наших силах. (Ральф Уолдо Эмерсон)',
            //     'Человека нельзя победить до тех пор, пока он сам не признает своего поражения. (Наполеон Хилл)'
            // ];
            //
            // function writeMotivation(day){
            //     switch (day){
            //         case (0):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[0]}</div>
            //             `)
            //             break;
            //         }
            //         case (1):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[1]}</div>
            //             `)
            //             break;
            //         }
            //         case (2):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[2]}</div>
            //             `)
            //             break;
            //         }
            //         case (3):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[3]}</div>
            //             `)
            //             break;
            //         }
            //         case (4):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[4]}</div>
            //             `)
            //             break;
            //         }
            //         case (5):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[5]}</div>
            //             `)
            //             break;
            //         }
            //         case (6):{
            //             res.write(`
            //                 <div class="Motivation">${motivationArr[6]}</div>
            //             `)
            //             break;
            //         }
            //     }
            // }
            //
            // writeMotivation(NowDay);

            res.write(`

                <br><br><br><br>

                <div class="footer">
                    <h5>Сайт разработали: Елембаев-Беломорских Роман, Жиделев Николай,7в</h5>
                </div>
            `);

            res.end();
        });
    }

    // if (req.url === '/') {
    //    fs.readFile(
    //        path.join(__dirname, 'htmls', 'indexStart.html'),
    //        'utf-8',
    //        (err, content) => {
    //            if (err) throw err;

    //            res.end(content);
    //        }
    //    )

    // } else if (req.url === '/smena2') {
    //     fs.readFile(
    //         path.join(__dirname, 'htmls', 'index.html'),
    //         'utf-8',
    //         (err, content) => {
    //             if (err) throw err;

    //             res.end(content);
    //         }
    //     )
    // }

    // if (req.on) {
    //     ++countOnline;
    //     console.log('client on!');
    //     console.log(countOnline);
    // }

    // if (req.offline) {
    //     // console.log(countOnline);
    // }



    // res.write(`Рома`)

    res.write(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Расписание 17 гимназии</title>
                
                <style>
                    .main{
                        position: relative;
                        width: 1920px;
                        height: 1080px;
                        

                        background: #d0d0d0;
                    }
                    
                    .main-bar{
                        box-sizing: border-box;

                        position: absolute;
                        width: 260px;
                        height: 1080px;
                        left: 2px;
                        top: -6px;

                        background: #2b2b34;

                    }
                    
                    .gimnName{
                        position: absolute;
                        width: 197px;
                        height: 88px;
                        left: 19px;
                        top: 14px;

                        /* Header 1 */

                        font-family: 'Montserrat';
                        font-style: normal;
                        font-weight: 900;
                        font-size: 20px;
                        line-height: 44px;

                        color: #FBE492;
                    }
                    
                    .weekDay-ul{
                        margin-top: 170px;

                        
                        list-style-type: none;
                    }
                    .weekDay-li-week{
                        font-size: 25px;
                        margin-top: 25px;
                        color: #FFFFFF;
                    }
                    .weekDay-li{
                        margin-top: 25px;
                        color: #FFFFFF;
                    }
                    a{
                        margin-top: 100px;
                        color: #FFFFFF;
                    }
                    .weekDay-li-week-change{
                        margin-top: 22px;
                        font-size: 25px;
                        color: #FFFFFF;
                    }
                    
                    .rasp-TABLE{
                        box-sizing: border-box;
                        display: flex;

                        position: absolute;
                        width: 1611px;
                        height: 743px;
                        left: 286px;
                        top: 209px;
                        background: white;

                        border: 1px solid #000000;
                    }
                    .RASPISANIE{
                        position: absolute;
                        width: 323px;
                        height: 59px;
                        left: 309px;
                        top: 76px;

                        font-family: 'Montserrat', 'sans-serif';
                        font-style: normal;
                        font-weight: 900;
                        font-size: 48px;
                        line-height: 59px;
                        /* identical to box height */


                        /* Dark grey */

                        color: #3B3B50;
                    }
                    .school-img{
                        position: absolute;
                        width: 1655px;
                        height: 280px;
                        left: 261px;
                        top: -231px;
                        

                        /*background: url('https://газетапятница.рф/media/6179555/gimnaziya.jpg');*/
                        opacity: 50%;
                    }
                    
                    .now-show-class{
                        position: absolute;
                            width: 134px;
                            height: 118px;
                            left: 50px;
                            top: 200px;

                            font-family: 'Montserrat', 'sans-serif';
                            font-style: normal;
                            font-weight: 900;
                            font-size: 96px;
                            line-height: 117px;

                            /* Dark grey */

                            color: #3B3B50;  
                    }
                    
                    
                    .rasp-TABLE-ul-number{
                        list-style-type: none;
                        
                        margin-top: 50px;
                        font-size: large;
                        
                        text-align: center;
                    }
                    
                    .rasp-TABLE-number-li{

                        width: 109px;
                        height: 49px;
                        
                        margin-top: 22px;
                        padding: 5px;


                        background: #F1EDED;
                    }
                    
                    .rasp-TABLE-ul-time{
                        list-style-type: none;
                        margin-top: 50px;
                        font-size: large;
                        
                        text-align: center;
                    }
                    
                    .rasp-TABLE-time-li{
                        width: 109px;
                        height: 49px;
                        
                        margin-top: 22px;
                        padding: 5px;


                        background: #F1EDED;
                    }
                    
                    .rasp-TABLE-ul-discipline{
                        list-style-type: none;
                        margin-top: 50px;
                        font-size: large;
                        
                        text-align: center;
                    }
                    .rasp-TABLE-discipline-li{
                        width: 334px;
                        height: 49px;
                        
                        margin-top: 22px;
                        padding: 5px;


                        background: #F1EDED;
                    }
                    
                    .rasp-TABLE-ul-class{
                        list-style-type: none;
                        margin-top: 50px;
                        font-size: large;
                        
                        text-align: center;
                    }
                    
                    .rasp-TABLE-class-li{
                        width: 109px;
                        height: 49px;
                        
                        margin-top: 22px;
                        padding: 5px;


                        background: #F1EDED;
                    }
                    
                    .dop-information{
                        position: absolute;
                        width: 868px;
                        height: 43px;
                        left: 310px;
                        top: 804px;

                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 36px;
                        line-height: 42px;
                        /* identical to box height */


                        color: #3B3B50;
                    }   
                    .dop-information-text{
                        position: absolute;
                        width: 868px;
                        height: 29px;
                        left: 310px;
                        top: 871px;

                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 24px;
                        line-height: 28px;
                        /* identical to box height */


                        color: #3B3B50;
                    }                 
                    
                </style>
                
            </head>
            <body>
                <div class="main">
                    <div class="main-bar">
                        <div class="gimnName">
                            <h1>Гимназия №17</h1>
                        </div>
                        <div class="weekDay">
                            <ul class="weekDay-ul">
                                <li class="weekDay-li-week">Текущая неделя</li>
                                <li><a href="/nowPn" class="weekDay-li">Понедельник</a></li>
                                <li><a href="/nowVt" class="weekDay-li">Вторник</a></li>
                                <li><a href="/nowSr" class="weekDay-li">Среда</a></li>
                                <li><a href="/nowCh" class="weekDay-li">Четверг</a></li>
                                <li><a href="/nowPt" class="weekDay-li">Пятница</a></li>
                                <li><a href="/nowSb" class="weekDay-li">Суббота</a></li>
                                <li class="weekDay-li-week-change" class="weekDay-li">Другая неделя</li>
                            </ul> 
                        </div>
                    </div>
                    
                    
                    <div class="school-img">
                        <img src="https://газетапятница.рф/media/6179555/gimnaziya.jpg" alt="" style="
                            min-width: 100%;
                            
                            /*overflow: hidden;*/
                            
                            margin-top: -420px;
                            margin-bottom: -200px: ; 
                            /*overflow: hidden;*/
                        ">
                    </div>
                    <h1 class="RASPISANIE">Расписание</h1>
                    
                    <div class="rasp-TABLE">
                        <h2 style="margin-left: 20px" id="izmRasp">Изменения расписания</h2>
                        
                        <h1 class="now-show-class" id="now-show-class"></h1>
                        
                        <ul class="rasp-TABLE-ul-number">
                            <li class="rasp-TABLE-number-li">№ урока</li>
                            <li class="rasp-TABLE-number-li">1</li>
                            <li class="rasp-TABLE-number-li">2</li>
                            <li class="rasp-TABLE-number-li">3</li>
                            <li class="rasp-TABLE-number-li">4</li>
                            <li class="rasp-TABLE-number-li">5</li>
                            <li class="rasp-TABLE-number-li">6</li>
                        </ul>
                        
                        <ul class="rasp-TABLE-ul-time">
                            <li class="rasp-TABLE-time-li">Время</li>
                            <li class="rasp-TABLE-time-li">13:40 - 14:20</li>
                            <li class="rasp-TABLE-time-li">14:30 - 15:05</li>
                            <li class="rasp-TABLE-time-li">15:20 - 15:55</li>
                            <li class="rasp-TABLE-time-li">16:10 - 16:45</li>
                            <li class="rasp-TABLE-time-li">17:00 - 17:35</li>
                            <li class="rasp-TABLE-time-li">17:50 - 18:25</li>
                        </ul>
                        
                        <ul class="rasp-TABLE-ul-discipline">
                            <li class="rasp-TABLE-discipline-li">Предмет</li>
                            <li class="rasp-TABLE-discipline-li" id="one"></li>
                            <li class="rasp-TABLE-discipline-li" id="two"></li>
                            <li class="rasp-TABLE-discipline-li" id="three"></li>
                            <li class="rasp-TABLE-discipline-li" id="four"></li>
                            <li class="rasp-TABLE-discipline-li" id="five"></li>
                            <li class="rasp-TABLE-discipline-li" id="six"></li>
                        </ul>
                        
                        <ul class="rasp-TABLE-ul-class">
                            <li class="rasp-TABLE-class-li">Кабинет</li>
                            <li class="rasp-TABLE-class-li" id="oneKab"></li>
                            <li class="rasp-TABLE-class-li" id="twoKab"></li>
                            <li class="rasp-TABLE-class-li" id="threeKab"></li>
                            <li class="rasp-TABLE-class-li" id="fourKab"></li>
                            <li class="rasp-TABLE-class-li" id="fiveKab"></li>
                            <li class="rasp-TABLE-class-li" id="sixKab"></li>
                        </ul>
                        
                        
                        
                        
                        
                    </div>
                    <h2 class="dop-information">Дополнительная информация</h2>
                    <h3 class="dop-information-text">Отсутствует</h3>
                </div>
            </body>
        </html>
    `)

    if(req.url === '/nowUpdates'){
        writeHTML("book.xlsx");
    }

    if(req.url === '/nowPn'){
        writeHTML("excels/week1/bookPn.xlsx");
    }

    if(req.url === '/nowVt'){
        writeHTML("excels/week1/bookVt.xlsx");
    }

    if(req.url === '/nowSr'){
        writeHTML("excels/week1/bookSr.xlsx");
    }

    if(req.url === '/nowCh'){
        writeHTML("excels/week1/bookCh.xlsx");
    }

    if(req.url === '/nowPt'){
        writeHTML("excels/week1/bookPt.xlsx");
    }

    if(req.url === '/nowSb'){
        writeHTML("excels/week1/bookSb.xlsx");
    }




    if(req.url === '/lastPn'){
        writeHTML("excels/week2/bookPn.xlsx");
    }

    if(req.url === '/lastVt'){
        writeHTML("excels/week2/bookVt.xlsx");
    }

    if(req.url === '/lastSr'){
        writeHTML("excels/week2/bookSr.xlsx");
    }

    if(req.url === '/lastCh'){
        writeHTML("excels/week2/bookCh.xlsx");
    }

    if(req.url === '/lastPt'){
        writeHTML("excels/week2/bookPt.xlsx");
    }

    if(req.url === '/lastSb'){
        writeHTML("excels/week2/bookSb.xlsx");
    }












})

server.listen(PORT, () => {
    console.log(`server is running in port:3000...`);
})


