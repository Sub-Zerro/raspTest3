const http = require("http");
const fs = require("fs");
const path = require("path");
let countOnline = 0;

const server = http.createServer((req, res) => {
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
    var filePath = path.resolve(__dirname, 'book.xlsx');
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

        res.write(`
        <!doctype html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
                         <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                                     <meta http-equiv="X-UA-Compatible" content="ie=edge">
                         <title>Document</title>
                         <style>
                         
                            body{
                                min-width: 1456px;
                            }
                         
                            span{
                                display: inline-block;
                                
                                width: 180px;
                                height: 20px;
                                
                            }
                            
                            div{
                                max-width: 1644px;
                                max-height: 26px;
                                
                            }
                            
                            /*@media screen and (orientation: landscape){*/
                            /*    div{*/
                            /*        position: fixed;*/
                            /*        width: 100%;*/
                            /*        */
                            /*    }*/
                            /*}*/
                         
                         </style>
            </head>
            <body>
            
                <script>
                    alert("Для удобства переверните телефон в альбомный формат.")
                </script>
              
                <div><b>${obj.dayOfWeek[0]}</b></div><br>
                
                Классы:
                
                
              
            </body>
            </html>
    `)

        function write(btnI) {
            alert(`Вы нажали на ${obj.headings[btnI]}`);
        }

        for (let i = 0; i < obj.headings.length; i++) {
            res.write(`

                <button id="btn${[i]}">${obj.headings[i]}</button>
                
                
            `);
        } // вывод классов через цикл, берущий за основу колличество классов в obj.headings

        res.write(`<br>`)

        for (let i = 0; i < obj.time.length; i++) {
            res.write(`
                    <div>${[i]}. ${obj.time[i]} 
                    <span id="${[i]}">${disciplineObj.coloumns[0][i] ? disciplineObj.coloumns[0][i] : 
                '                   '} ${obj.classRoom[i] ? obj.classRoom[i] : '    '}</span>
                    <span>${obj.anotherDisciplines[0][i] ? obj.anotherDisciplines[0][i]
                : '                   '} ${obj.anotherClassrooms[0][i] ? obj.anotherClassrooms[0][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[1][i] ? obj.anotherDisciplines[1][i]
                : '                   '} ${obj.anotherClassrooms[1][i] ? obj.anotherClassrooms[1][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[2][i] ? obj.anotherDisciplines[2][i]
                : '                   '} ${obj.anotherClassrooms[2][i] ? obj.anotherClassrooms[2][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[3][i] ? obj.anotherDisciplines[3][i]
                : '                   '} ${obj.anotherClassrooms[3][i] ? obj.anotherClassrooms[3][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[4][i] ? obj.anotherDisciplines[4][i]
                : '                   '} ${obj.anotherClassrooms[4][i] ? obj.anotherClassrooms[4][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[5][i] ? obj.anotherDisciplines[5][i]
                : '                   '} ${obj.anotherClassrooms[5][i] ? obj.anotherClassrooms[5][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[6][i] ? obj.anotherDisciplines[6][i]
                : '                   '} ${obj.anotherClassrooms[6][i] ? obj.anotherClassrooms[6][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[7][i] ? obj.anotherDisciplines[7][i]
                : '                   '} ${obj.anotherClassrooms[7][i] ? obj.anotherClassrooms[7][i] : '    '}</span>
                    <span>${obj.anotherDisciplines[8][i] ? obj.anotherDisciplines[8][i]
                : '                   '} ${obj.anotherClassrooms[8][i] ? obj.anotherClassrooms[8][i] : '    '}</span>
                    </div>
        `);
        } // // вывод времени через цикл, берущий за основу колличество ячеек времени в obj.times
    });
})

server.listen(3000, () => {
    console.log(`server is running in port:3000...`);
})


