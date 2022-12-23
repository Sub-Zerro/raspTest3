// выделение нужных для работы модулей в nodejs и запись их в отдельные переменные
const http = require("http");
const fs = require("fs");
const path = require("path");
var mailer = require("nodemailer");
let countOnline = 0;
const PORT = process.env.PORT || 3000;
const {Pool, Client} = require('pg');
lastElement = (arr) => arr[arr.length-1];
let popLastDate;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
let arrNumbers = [];
let setArrNumbers = [];

// информация о базе данных на хероку gimnasia17, создание подключения по параметрам
const pool = new Pool({
    host: 'db.tzyuaqjszrpqxnywukcm.supabase.co',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'postgres',
    password: 'wrH_RT@easgfh',
    database: 'postgres',
    port: 5432,
    ssl: true
})

// получение текущей даты и времени
let dateOf = new Date();
let dayOfYear = dateOf.getDate();
let monthOfYear = dateOf.getMonth();
let nowMinutes = dateOf.getMinutes();
if(dayOfYear<10){
    dayOfYear = `0${dayOfYear}`;
}
monthOfYear = monthOfYear+=1;
if (monthOfYear>12){
    monthOfYear=1;
}
if(monthOfYear<10){
    monthOfYear = `0${monthOfYear}`;
}


const conkateDateSrt = `${dayOfYear}.${monthOfYear}`;
console.log(conkateDateSrt);

// переменная, хранящая в себе последнее число в базе дынных
let lastDayInDB;

// объект obj в котором хранятся данные о последних изменениях, основываясь на запрос в базу на число lastDayInDB
let obj = {
    dayOfWeek: [],         // день недели
    number: [],        // номер урока
    time: [],      // время урока //название класса как массив (например 7в - 7,в)
    discipline: [],  // предмет, класс
    classRoom: [], // кабинет
    headingsStart: [],
    headings: [], // азвания классов
    // teacher:[],     // учитель
    // distant:false   // на дистанте (да / нет)
    classes:[
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
    ]
    // disciplines: [[],[]]
};
checkDate();
console.log(nowMinutes);

const shell = require('shelljs')
const path2 = __dirname;
setInterval(()=>{
    dateOf = new Date();
    nowMinutes = dateOf.getMinutes();
}, 100)


setInterval(()=>{
    if(nowMinutes%2==0){
        fs.rmdir(path.join(__dirname, '/test'), { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("directory deleted successfully");
            }
        })

        setTimeout(()=>{
            shell.cd(path2)
            shell.exec('git clone https://github.com/Sub-Zerro/test')
        }, 2000)

        setTimeout(()=>{
            /*if(popLastDate !== numberOfDate){


                for(let i = 0; i<disciplineObj.coloumns[0].length; i++) {
                    addNewRasp(numberOfDate ? numberOfDate : null, dayOfWeekForBD ? dayOfWeekForBD : null, smenaForBD ? smenaForBD : null, obj.number[i] ? obj.number[i] : 0, obj.time[i] ? obj.time[i] : null, obj.headings[0] ? obj.headings[0] : null, disciplineObj.coloumns[0][i] ? disciplineObj.coloumns[0][i] : null, obj.classRoom[i] ? obj.classRoom[i] : null)
                }


                obj.headings.shift();

                for(let i = 0; i<obj.headings.length; i++){

                    for(let k = 0; k<obj.anotherDisciplines[i].length; k++){
                        addNewRasp(numberOfDate ? numberOfDate : null, dayOfWeekForBD ? dayOfWeekForBD : null, smenaForBD ? smenaForBD : null, obj.number[k] ? obj.number[k] : 0, obj.time[k] ? obj.time[k] : null, obj.headings[i] ? obj.headings[i] : null, obj.anotherDisciplines[i][k] ? obj.anotherDisciplines[i][k] : null, obj.anotherClassrooms[i][k] ? obj.anotherClassrooms[i][k] : null)
                    }
                }
                console.log("Нулевое чиисло в obj.number: ", obj.number[0]);
                console.log(obj.number);
                // setTimeout(()=>{
                //     console.log(numberOfDate, popLastDate);
                // }, 3400)

            }*/


            let arr = [];
            const dateOf = new Date();
            let dayOfYear = dateOf.getDate();
            let monthOfYear = dateOf.getMonth();
            if(dayOfYear<10){
                dayOfYear = `0${dayOfYear}`;
            }
            monthOfYear = monthOfYear+=1;
            if (monthOfYear>12){
                monthOfYear=1;
            }
            if(monthOfYear<10){
                monthOfYear = `0${monthOfYear}`;
            }


            const conkateDateSrt = `${dayOfYear}.${monthOfYear}`;
            console.log(conkateDateSrt);
            function checkRasp(){
                const query = "select number from schedules;";

                pool.query(query)
                    .then(res => {
                        const rows = res.rows;

                        rows.map(row => {
                            console.log(`Read: ${JSON.stringify(row)}`);
                        });

                        for (let i = 0; i<res.rows.length; i++){
                            arr.push(res.rows[i]['number']);
                        }

                        console.log(arr);

                        popLastDate = lastElement(arr);
                    })
                    .catch(err => {
                        console.log(err);
                    });


                // for(let i = 0; i<arr.length; i++){
                //     if ()
                // }
            }
            checkRasp();

            function addNewRasp(number, dayOfWeek, smena, numberOfDiscipline, time, classes, discipline, kabinet){
                const query = `INSERT INTO schedules(number, dayofweek, smena, numberofdiscipline, time, classes, discipline, kabinet)values
                        ('${number}', '${dayOfWeek}', '${smena}', '${numberOfDiscipline}', '${time}', '${classes}', '${discipline}', '${kabinet}');`;


                pool.query(query)
                    .then(res => {
                        const rows = res.rows;

                        rows.map(row => {
                            console.log(`Read: ${JSON.stringify(row)}`);
                        });



                        console.log(arr);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }



// const server = http.createServer((req, res) => {

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
                }

                var wb = new Excel.Workbook();
                // var filePath = path.resolve(__dirname, `${file}`);
                var filePath = path.join(__dirname, '/test', '/book.xlsx');
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
                                    // console.log('k', k);
                                    break;
                                }
                                case (1): {
                                    if(valueOfCell[j] === "№"){
                                        continue;
                                    }else{
                                        obj.number[i] = valueOfCell[j];
                                    }

                                    // console.log('k', k);
                                    break;
                                }
                                case (2): {
                                    obj.time[i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }
                                case (3): {
                                    obj.discipline[i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }
                                case (4): {
                                    obj.classRoom[i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (5): {
                                    obj.anotherDisciplines[0][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (6): {
                                    obj.anotherClassrooms[0][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (7): {
                                    obj.anotherDisciplines[1][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (8): {
                                    obj.anotherClassrooms[1][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (9): {
                                    obj.anotherDisciplines[2][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (10): {
                                    obj.anotherClassrooms[2][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (11): {
                                    obj.anotherDisciplines[3][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (12): {
                                    obj.anotherClassrooms[3][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (13): {
                                    obj.anotherDisciplines[4][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (14): {
                                    obj.anotherClassrooms[4][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (15): {
                                    obj.anotherDisciplines[5][i] = valueOfCell[j];
                                    // console.log('k', k);
                                    break;
                                }

                                case (16): {
                                    obj.anotherClassrooms[5][i] = valueOfCell[j];
                                    // console.log('k', k);
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

                    console.log("obj.discipline", obj.discipline);
                    console.log("obj.classRoom", obj.classRoom);
                    console.log("obj.time", obj.time);
                    console.log("obj.number", obj.number);
                    console.log("obj.dayOfWeek", obj.dayOfWeek);


                    for (z = 1; z <= 35; z++) {
                        stringResponse = stringResponse + obj.dayOfWeek[z] + " " + obj.number[z] + " " + obj.time[z] + ' ' + obj.discipline[z] + ' ' + obj.classRoom[z] + "\n";

                    }
                    function stopping(){
                        setTimeout(()=>{console.log("Перерыв")}, 2000)
                    }

                    console.log(obj.headings);
                    console.log(disciplineObj);
                    console.log('another:', obj.anotherDisciplines);
                    console.log(obj.anotherClassrooms);

                    console.log("НЕПОНЯТНАЯ ШТУКА!!!!", disciplineObj);
                    arr = [];
                    checkRasp();
                    let checkRaspLet = 1;
                    if(arr[0]===conkateDateSrt){
                        console.log("Изменения на эот день уже есть в базе");
                    } else{
                        checkRaspLet = -1;
                    }
                    let x = 1;
                    const dayOfWeekForBD = obj.dayOfWeek[2];
                    const numberOfDate = obj.dayOfWeek[3];
                    const smenaForBD = obj.dayOfWeek[1];



                    console.log(disciplineObj.coloumns[0].length);

                    if(popLastDate !== conkateDateSrt){
                        console.log("Все ок");
                    }
                    console.log(popLastDate, numberOfDate)
                    if(popLastDate === numberOfDate){
                        console.log("Уже есть в базе этот день");
                    }



                    if(popLastDate !== numberOfDate){


                        for(let i = 0; i<disciplineObj.coloumns[0].length; i++) {
                            addNewRasp(numberOfDate ? numberOfDate : null, dayOfWeekForBD ? dayOfWeekForBD : null, smenaForBD ? smenaForBD : null, obj.number[i] ? obj.number[i] : 0, obj.time[i] ? obj.time[i] : null, obj.headings[0] ? obj.headings[0] : null, disciplineObj.coloumns[0][i] ? disciplineObj.coloumns[0][i] : null, obj.classRoom[i] ? obj.classRoom[i] : null)
                        }


                        obj.headings.shift();

                        for(let i = 0; i<obj.headings.length; i++){

                            for(let k = 0; k<obj.anotherDisciplines[i].length; k++){
                                addNewRasp(numberOfDate ? numberOfDate : null, dayOfWeekForBD ? dayOfWeekForBD : null, smenaForBD ? smenaForBD : null, obj.number[k] ? obj.number[k] : 0, obj.time[k] ? obj.time[k] : null, obj.headings[i] ? obj.headings[i] : null, obj.anotherDisciplines[i][k] ? obj.anotherDisciplines[i][k] : null, obj.anotherClassrooms[i][k] ? obj.anotherClassrooms[i][k] : null)
                            }
                        }
                        console.log("Нулевое число в obj.number: ", obj.number[0]);
                        console.log(obj.number);
                        // setTimeout(()=>{
                        //     console.log(numberOfDate, popLastDate);
                        // }, 3400)

                        setTimeout(()=>{
                            /*const pg = require('pg');

                            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

                            const config = {
                                host: 'db.tzyuaqjszrpqxnywukcm.supabase.co',
                                // Do not hard code your username and password.
                                // Consider using Node environment variables.
                                user: 'postgres',
                                password: 'wrH_RT@easgfh',
                                database: 'postgres',
                                port: 5432,
                                ssl: true
                            };

                            const client = new pg.Client(config);*/

                            pool.connect(err => {
                                if (err) throw err;
                                else { queryDatabase(); }
                            });

                            let arr = [];
                            let answerArr = [""];

                            function queryDatabase() {

                                console.log(`Running query to PostgreSQL server: ${pool.host}`);

                                const query = 'select email from users;';

                                pool.query(query)
                                    .then(res => {
                                        const rows = res.rows;

                                        rows.map(row => {
                                            console.log(`Read: ${JSON.stringify(row)}`);
                                        });

                                        for (let i = 0; i<res.rows.length; i++){
                                            arr.push(res.rows[i]['email']);
                                        }

                                        console.log(arr);


                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }







                            setTimeout(()=>{
                                for (i = 0; i<arr.length; i++){
                                    var smtpTransport = mailer.createTransport({
                                        host: 'smtp.mail.ru',
                                        port: 465,
                                        //host: 'smtp.yandex.ru',
                                        //port: 465,
                                        secure: true,
                                        auth: {
                                            user: 'rasp17gimn@mail.ru',
                                            pass: 'MzhmQGN4rqivHcdHECUz'
                                            //user: 'rasp17gimn@yandex.ru',
                                            //pass: 'dpleocbwkogegsyb'
                                        }
                                    });

                                    var mail = {
                                        from: "Оповещения расписания 17 гимназии <rasp17gimn@mail.ru>",
                                        to: `${arr[i]}`,
                                        subject: `Появилось новое изменение`,
                                        //text: "Вы можете посмотреть расписание по ссылке: 'https://gimnasia17.herokuapp.com/'",
                                        text: "Появилось новое изменение",
                                    }

                                    smtpTransport.sendMail(mail, function(error, response){
                                        if(error){
                                            console.log(error);
                                        }else{
                                            console.log("Message sent: " + response.message);
                                        }

                                        smtpTransport.close();
                                    });

                                }
                            }, 3000)



                        }, 7000)

                    }



                });
            }

            setTimeout(()=>{
                try {

                    // код...
                    //writeHTML('test/book.xlsx');
                    writeHTML(path.join(__dirname, '/test', '/book.xlsx'));
                } catch (err) {

                    // обработка ошибки
                    console.log("Данного файла не существует в текущей папки, обработка невозможна");


                }

            }, 5000)
        }, 3000)







    }
}, 60000)


setTimeout(()=>{
    checkRasp(lastDayInDB);
}, 2000)

// интервал обновления объекта obj ля получения последних изменений из базы данных
setInterval(()=>{

    obj = {
        dayOfWeek: [],         // день недели
        number: [],        // номер урока
        time: [],      // время урока //название класса как массив (например 7в - 7,в)
        discipline: [],  // предмет, класс
        classRoom: [], // кабинет
        headingsStart: [],
        headings: [], // азвания классов
        // teacher:[],     // учитель
        // distant:false   // на дистанте (да / нет)
        classes:[
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ]
        // disciplines: [[],[]]
    };

    checkDate();
    setTimeout(()=>{
        checkRasp(lastDayInDB);
    }, 1500)
}, 15000)


// функция получения всех чисел расписаний из базы данных, запись в массив и получение последненго числа для записи его в переменную lastDayInDB
function checkDate(){
    const query = "select number from schedules order by id asc;";

    pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                // arr.push(res.rows[i]['number']);
                lastDayInDB = res.rows[i]['number'];
            }

            console.log(lastDayInDB);
            for(let i = 0; i<res.rows.length; i++){
                arrNumbers.push(res.rows[i]['number']);
            }
            setArrNumbers = Array.from(new Set(arrNumbers));
        })
        .catch(err => {
            console.log(err);
        });

}

// функция отправки запроса в базу данных на получение строк расписания ну указанный в вызове финкции число расписания(day),и запись в объект bj
function checkRasp (day){
    const query = `select * from schedules where number like '${day}';`;
    let arr = [];

    pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                obj.headingsStart.push(res.rows[i]['classes']);
            }

            for (let i = 0; i<res.rows.length; i++){
                arr.push(res.rows[i]['number']);
            }

            popLastDate = lastElement(arr);

            obj.headings =  Array.from(new Set(obj.headingsStart));
            console.log(obj.headings);

            for (let i = 0; i<obj.headings.length; i++){
                obj.classes[i][0] = obj.headings[i];

                for(let k = 0; k<res.rows.length; k++){
                    if(res.rows[k]['classes']===obj.headings[i]){
                        // obj.classes[i][1].push(res.rows[k]['discipline']);
                        // obj.classes[i][2].push(res.rows[k]['kabinet']);
                        obj.classes[i][1][res.rows[k]['numberofdiscipline']] = res.rows[k]['discipline'];
                        obj.classes[i][2][res.rows[k]['numberofdiscipline']] = res.rows[k]['kabinet'];
                        obj.classes[i][3][res.rows[k]['numberofdiscipline']] = res.rows[k]['time'];
                    }
                }
            }
            console.log(obj.classes);



        })
        .catch(err => {
            console.log(err);
        });
}





// создание сервера через метод createServer(), используя модуль http
const server = http.createServer((req, res) => {


    let obj2 = {
        dayOfWeek: [],         // день недели
        number: [],        // номер урока
        time: [],      // время урока //название класса как массив (например 7в - 7,в)
        discipline: [],  // предмет, класс
        classRoom: [], // кабинет
        headingsStart: [],
        headings: [], // азвания классов
        // teacher:[],     // учитель
        // distant:false   // на дистанте (да / нет)
        classes:[
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
            ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']],
        ]
        // disciplines: [[],[]]
    };

    function checkRasp2 (day2){
        const query = `select * from schedules where number like '${day2}';`;

        pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                for (let i = 0; i<res.rows.length; i++){
                    obj2.headingsStart.push(res.rows[i]['classes']);
                }

                obj2.headings =  Array.from(new Set(obj2.headingsStart));
                console.log(obj2.headings);

                for (let i = 0; i<obj2.headings.length; i++){
                    obj2.classes[i][0] = obj2.headings[i];

                    for(let k = 0; k<res.rows.length; k++){
                        if(res.rows[k]['classes']===obj2.headings[i]){
                            // obj.classes[i][1].push(res.rows[k]['discipline']);
                            // obj.classes[i][2].push(res.rows[k]['kabinet']);
                            obj2.classes[i][1][res.rows[k]['numberofdiscipline']] = res.rows[k]['discipline'];
                            obj2.classes[i][2][res.rows[k]['numberofdiscipline']] = res.rows[k]['kabinet'];
                            obj2.classes[i][3][res.rows[k]['numberofdiscipline']] = res.rows[k]['time'];
                        }
                    }
                }
                console.log(obj2.classes);



            })
            .catch(err => {
                console.log(err);
            });
    }

    function writeHTML(file){


        for (let i = 0; i < file.headings.length; i++) {
            res.write(`

                    <script>
                        let zgolovokIzmeneny${[i]} = document.getElementById('izmRasp');
                        console.log(zgolovokIzmeneny${[i]});
                        let a${[i]} = document.createElement("button");
                        let zagolovokIzmenenyClass${[i]} = document.getElementById('now-show-class');
                        a${[i]}.textContent = '${file.headings[i]}';
                        zagolovokIzmenenyClass${[i]}.textContent = '${file.headings[0]}';
                        
                        let firstTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[1];
                        let secondTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[2];
                        let thirdTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[3];
                        let fourthTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[4];
                        let fifthTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[5];
                        let sixthTimeBlock${[i]} = document.getElementsByClassName('rasp-TABLE-time-li')[6];
                        
                        
                        
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
                        
                        let firstTime${[i]} = document.getElementById('oneTime');
                        let secondTime${[i]} = document.getElementById('twoTime');
                        let thirdTime${[i]} = document.getElementById('threeTime');
                        let fourthTime${[i]} = document.getElementById('fourTime');
                        let fifthTime${[i]} = document.getElementById('fiveTime');
                        let sixthTime${[i]} = document.getElementById('sixTime');
                        
                        zgolovokIzmeneny${[i]}.append(a${[i]});
                        firstDiscipline${[i]}.textContent = '${file.classes[0][1][0] ? file.classes[0][1][0] : ''}';
                            secondDiscipline${[i]}.textContent = '${file.classes[0][1][1] ? file.classes[0][1][1] : ''}';
                            thirdDiscipline${[i]}.textContent = '${file.classes[0][1][2] ? file.classes[0][1][2] : ''}';
                            fourthDiscipline${[i]}.textContent = '${file.classes[0][1][3] ? file.classes[0][1][3] : ''}';
                            fifthDiscipline${[i]}.textContent = '${file.classes[0][1][4] ? file.classes[0][1][4] : ''}';
                            sixthDiscipline${[i]}.textContent = '${file.classes[0][1][5] ? file.classes[0][1][5] : ''}';

                            firstKab${[i]}.textContent = '${file.classes[0][2][0] ? file.classes[0][2][0] : ''}';
                            secondKab${[i]}.textContent = '${file.classes[0][2][1] ? file.classes[0][2][1] : ''}';
                            thirdKab${[i]}.textContent = '${file.classes[0][2][2] ? file.classes[0][2][2] : ''}';
                            fourthKab${[i]}.textContent = '${file.classes[0][2][3] ? file.classes[0][2][3] : ''}';
                            fifthKab${[i]}.textContent = '${file.classes[0][2][4] ? file.classes[0][2][4] : ''}';
                            sixthKab${[i]}.textContent = '${file.classes[0][2][5] ? file.classes[0][2][5] : ''}';
                        
                            firstTime${[i]}.textContent = '${file.classes[0][3][0] ? file.classes[0][3][0] : ''}';
                            secondTime${[i]}.textContent = '${file.classes[0][3][1] ? file.classes[0][3][1] : ''}';
                            thirdTime${[i]}.textContent = '${file.classes[0][3][2] ? file.classes[0][3][2] : ''}';
                            fourthTime${[i]}.textContent = '${file.classes[0][3][3] ? file.classes[0][3][3] : ''}';
                            fifthTime${[i]}.textContent = '${file.classes[0][3][4] ? file.classes[0][3][4] : ''}';
                            sixthTime${[i]}.textContent = '${file.classes[0][3][5] ? file.classes[0][3][5] : ''}';
                            
                        const checkA${[i]} = '7а';
                        const checkB${[i]} = '7б';
                        const checkC${[i]} = '7в';
                        
                        // function checkClass(class){
                        //     if (class.textContent == 'Рома'){
                        //         console.log('это Рома');
                        //     }
                        // }
                        
                        a${[i]}.addEventListener('click', ()=>{
                            zagolovokIzmenenyClass${[i]}.textContent = '${file.headings[i]}';
                        })
                    </script>
            `);
        } // вывод классов через цикл, берущий за основу колличество классов в file.headings

        res.write(`
                <script>
                    let oneDiscipline = document.getElementById('one');
                    let twoDiscipline = document.getElementById('two');
                    let threeDiscipline = document.getElementById('three');
                    let fourDiscipline = document.getElementById('four');
                    let fiveDiscipline = document.getElementById('five');
                    let sixDiscipline = document.getElementById('six');

                    let zgolovokIzmenenyV2 = document.getElementById('izmRasp');

                    let firstKabV2 = document.getElementById('oneKab');
                    let secondKabV2 = document.getElementById('twoKab');
                    let thirdKabV2 = document.getElementById('threeKab');
                    let fourthKabV2 = document.getElementById('fourKab');
                    let fifthKabV2 = document.getElementById('fiveKab');
                    let sixthKabV2 = document.getElementById('sixKab');
                    
                    let firstTimeV2 = document.getElementById('oneTime');
                    let secondTimeV2 = document.getElementById('twoTime');
                    let thirdTimeV2 = document.getElementById('threeTime');
                    let fourthTimeV2 = document.getElementById('fourTime');
                    let fifthTimeV2 = document.getElementById('fiveTime');
                    let sixthTimeV2 = document.getElementById('sixTime');

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
                            oneDiscipline.textContent = '${file.classes[0][1][0] ? file.classes[0][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[0][1][1] ? file.classes[0][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[0][1][2] ? file.classes[0][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[0][1][3] ? file.classes[0][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[0][1][4] ? file.classes[0][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[0][1][5] ? file.classes[0][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[0][2][0] ? file.classes[0][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[0][2][1] ? file.classes[0][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[0][2][2] ? file.classes[0][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[0][2][3] ? file.classes[0][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[0][2][4] ? file.classes[0][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[0][2][5] ? file.classes[0][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[0][3][0] ? file.classes[0][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[0][3][1] ? file.classes[0][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[0][3][2] ? file.classes[0][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[0][3][3] ? file.classes[0][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[0][3][4] ? file.classes[0][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[0][3][5] ? file.classes[0][3][5] : ''}';
                        })
                    }




                    if (btn2!=null){
                        btn2.addEventListener('click', ()=>{
                            oneDiscipline.textContent = '${file.classes[1][1][0] ? file.classes[1][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[1][1][1] ? file.classes[1][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[1][1][2] ? file.classes[1][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[1][1][3] ? file.classes[1][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[1][1][4] ? file.classes[1][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[1][1][5] ? file.classes[1][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[1][2][0] ? file.classes[1][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[1][2][1] ? file.classes[1][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[1][2][2] ? file.classes[1][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[1][2][3] ? file.classes[1][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[1][2][4] ? file.classes[1][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[1][2][5] ? file.classes[1][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[1][3][0] ? file.classes[1][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[1][3][1] ? file.classes[1][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[1][3][2] ? file.classes[1][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[1][3][3] ? file.classes[1][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[1][3][4] ? file.classes[1][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[1][3][5] ? file.classes[1][3][5] : ''}';
                        })
                    }

                    if (btn3!=null){
                        btn3.addEventListener('click', ()=>{
                            oneDiscipline.textContent = '${file.classes[2][1][0] ? file.classes[2][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[2][1][1] ? file.classes[2][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[2][1][2] ? file.classes[2][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[2][1][3] ? file.classes[2][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[2][1][4] ? file.classes[2][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[2][1][5] ? file.classes[2][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[2][2][0] ? file.classes[2][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[2][2][1] ? file.classes[2][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[2][2][2] ? file.classes[2][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[2][2][3] ? file.classes[2][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[2][2][4] ? file.classes[2][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[2][2][5] ? file.classes[2][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[2][3][0] ? file.classes[2][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[2][3][1] ? file.classes[2][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[2][3][2] ? file.classes[2][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[2][3][3] ? file.classes[2][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[2][3][4] ? file.classes[2][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[2][3][5] ? file.classes[2][3][5] : ''}';
                        })
                    }

                    if (btn4!=null){
                        btn4.addEventListener('click', ()=>{
                            oneDiscipline.textContent = '${file.classes[3][1][0] ? file.classes[3][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[3][1][1] ? file.classes[3][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[3][1][2] ? file.classes[3][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[3][1][3] ? file.classes[3][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[3][1][4] ? file.classes[3][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[3][1][5] ? file.classes[3][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[3][2][0] ? file.classes[3][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[3][2][1] ? file.classes[3][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[3][2][2] ? file.classes[3][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[3][2][3] ? file.classes[3][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[3][2][4] ? file.classes[3][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[3][2][5] ? file.classes[3][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[3][3][0] ? file.classes[3][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[3][3][1] ? file.classes[3][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[3][3][2] ? file.classes[3][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[3][3][3] ? file.classes[3][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[3][3][4] ? file.classes[3][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[3][3][5] ? file.classes[3][3][5] : ''}';
                        })
                    }

                    if (btn5!=null){
                        btn5.addEventListener('click', ()=>{
                            oneDiscipline.textContent = '${file.classes[4][1][0] ? file.classes[4][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[4][1][1] ? file.classes[4][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[4][1][2] ? file.classes[4][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[4][1][3] ? file.classes[4][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[4][1][4] ? file.classes[4][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[4][1][5] ? file.classes[4][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[4][2][0] ? file.classes[4][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[4][2][1] ? file.classes[4][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[4][2][2] ? file.classes[4][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[4][2][3] ? file.classes[4][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[4][2][4] ? file.classes[4][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[4][2][5] ? file.classes[4][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[4][3][0] ? file.classes[4][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[4][3][1] ? file.classes[4][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[4][3][2] ? file.classes[4][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[4][3][3] ? file.classes[4][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[4][3][4] ? file.classes[4][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[4][3][5] ? file.classes[4][3][5] : ''}';
                        })
                    }

                    if (btn6!=null){
                        btn6.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${file.classes[5][1][0] ? file.classes[5][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[5][1][1] ? file.classes[5][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[5][1][2] ? file.classes[5][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[5][1][3] ? file.classes[5][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[5][1][4] ? file.classes[5][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[5][1][5] ? file.classes[5][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[5][2][0] ? file.classes[5][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[5][2][1] ? file.classes[5][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[5][2][2] ? file.classes[5][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[5][2][3] ? file.classes[5][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[5][2][4] ? file.classes[5][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[5][2][5] ? file.classes[5][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[5][3][0] ? file.classes[5][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[5][3][1] ? file.classes[5][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[5][3][2] ? file.classes[5][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[5][3][3] ? file.classes[5][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[5][3][4] ? file.classes[5][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[5][3][5] ? file.classes[5][3][5] : ''}';
                        })
                    }

                    if (btn7!=null){
                        btn7.addEventListener('click', ()=>{
                        oneDiscipline.textContent = '${file.classes[6][1][0] ? file.classes[6][1][0] : ''}';
                            twoDiscipline.textContent = '${file.classes[6][1][1] ? file.classes[6][1][1] : ''}';
                            threeDiscipline.textContent = '${file.classes[6][1][2] ? file.classes[6][1][2] : ''}';
                            fourDiscipline.textContent = '${file.classes[6][1][3] ? file.classes[6][1][3] : ''}';
                            fiveDiscipline.textContent = '${file.classes[6][1][4] ? file.classes[6][1][4] : ''}';
                            sixDiscipline.textContent = '${file.classes[6][1][5] ? file.classes[6][1][5] : ''}';

                            firstKabV2.textContent = '${file.classes[6][2][0] ? file.classes[6][2][0] : ''}';
                            secondKabV2.textContent = '${file.classes[6][2][1] ? file.classes[6][2][1] : ''}';
                            thirdKabV2.textContent = '${file.classes[6][2][2] ? file.classes[6][2][2] : ''}';
                            fourthKabV2.textContent = '${file.classes[6][2][3] ? file.classes[6][2][3] : ''}';
                            fifthKabV2.textContent = '${file.classes[6][2][4] ? file.classes[6][2][4] : ''}';
                            sixthKabV2.textContent = '${file.classes[6][2][5] ? file.classes[6][2][5] : ''}';
                            
                            firstTimeV2.textContent = '${file.classes[6][3][0] ? file.classes[6][3][0] : ''}';
                            secondTimeV2.textContent = '${file.classes[6][3][1] ? file.classes[6][3][1] : ''}';
                            thirdTimeV2.textContent = '${file.classes[6][3][2] ? file.classes[6][3][2] : ''}';
                            fourthTimeV2.textContent = '${file.classes[6][3][3] ? file.classes[6][3][3] : ''}';
                            fifthTimeV2.textContent = '${file.classes[6][3][4] ? file.classes[6][3][4] : ''}';
                            sixthTimeV2.textContent = '${file.classes[6][3][5] ? file.classes[6][3][5] : ''}';
                        })
                    }
                </script>
            `)



        // res.end();
    }







    // for(let i = 0; i<setArrNumbers.length; i++){
    //     res.write(`
    //                 <script>
    //                     let select${i} = document.getElementById('selectNumber');
    //                     let aForDB${i} = document.createElement('a');
    //                     aForDB${i}.href='/${setArrNumbers[i]}';
    //                     aForDB${i}.textContent = '${setArrNumbers[i]}'
    //                     select${i}.appendChild(aForDB${i});
    //                 </script>
    //             `)
    // }
    res.write(`
        <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Расписание 17 гимназии</title>
                
                <style>
                
                    @media screen and (min-width:1001px){
                        .linkOfDBnumber{
                            margin-left: 5px;
                        }
                      .look-calendar {
                        
                        width:200px;
                        border:1px solid #c0c0c0;
                        padding:6px;
                        margin-left: 0;
                        background-color: white;
                        /*margin: 0 auto;    */
                      }
                      #calendar {
                        width: 100%;
                        line-height: 1.2em;
                        font-size: 15px;
                        text-align: center;
                        border-spacing:0px;
                      }
                      #calendar tr.dn td {
                        font-size: 15px;
                      }
                      #calendar thead tr:last-child {
                        font-size: small;
                        color: #555555;
                      }
                      #calendar thead tr:nth-child(1) td:nth-child(2) {
                        color: #323232;
                      }
                      #calendar thead tr:nth-child(1) td:nth-child(1):hover,
                      #calendar thead tr:nth-child(1) td:nth-child(3):hover {
                        cursor: pointer;
                      }
                      #calendar tbody td {
                        color: #2c567a;
                      }
                      #calendar tbody td:nth-child(n+6),
                      #calendar .holiday {
                        color: #e78c5c;
                      }
                      #calendar tbody td.today {
                        background: #dc0000;
                        color: #fff;
                      }
                
                
                
                
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
                        top: 168px;
                        

                        /*background: url('https://cdn.discordapp.com/attachments/989420407511732265/1054259814643011584/gimnaziya.jpg');*/
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
                    h5{
                        height:20px;
                        font-size:20px;
                        text-align:center;
                    }
                    #Registr{
                        margin-top: 300px; 
                    }
                    #izmRasp{
                        margin-left: 20px;
                    }
                    }
                    @media screen and (max-width: 1000px) {
                        .linkOfDBnumber{
                            margin-left: 5px;
                        }
                      .look-calendar {
                        
                        width:200px;
                        border:1px solid #c0c0c0;
                        padding:6px;
                        margin-left: 0;
                        background-color: white;
                        /*margin: 0 auto;    */
                      }
                      #calendar {
                        width: 100%;
                        line-height: 1.2em;
                        font-size: 15px;
                        text-align: center;
                        border-spacing:0px;
                      }
                      #calendar tr.dn td {
                        font-size: 15px;
                      }
                      #calendar thead tr:last-child {
                        font-size: small;
                        color: #555555;
                      }
                      #calendar thead tr:nth-child(1) td:nth-child(2) {
                        color: #323232;
                      }
                      #calendar thead tr:nth-child(1) td:nth-child(1):hover,
                      #calendar thead tr:nth-child(1) td:nth-child(3):hover {
                        cursor: pointer;
                      }
                      #calendar tbody td {
                        color: #2c567a;
                      }
                      #calendar tbody td:nth-child(n+6),
                      #calendar .holiday {
                        color: #e78c5c;
                      }
                      #calendar tbody td.today {
                        background: #dc0000;
                        color: #fff;
                      }
                
                
                
                
                    .main{
                        position: relative;
                        width: 375px;
                        height: 812px;
                        
    
                        background: #d0d0d0;
                    }
                    
                    .main-bar{
                        box-sizing: border-box;
    
                        position: absolute;
                        width: 100%;
                        height: 13%;
                        top: -6px;
    
                        background: #2b2b34;
    
                    }
                    
                    .gimnName{
                        display:none;
                    }
                    
                    .weekDay-ul{
    
                        
                        list-style-type: none;
                    }
                    .weekDay-li-week{
                        font-size: 90%;
                        margin-top: 25px;
                        color: #FFFFFF;
                    }
                    .weekDay-li{
                        margin-top: 25px;
                        color: #FFFFFF;
                    }
                    a{
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
                        width: 100%;
                        height: 83%;
                    
                        background: white;
                        top:12.2%;
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
                    .now-show-class{
                        position: absolute;
                            left: 2%;
    
                            font-family: 'Montserrat', 'sans-serif';
                            font-style: normal;
                            font-size: 120%;
                            line-height: 300%;
    
                            /* Dark grey */
    
                            color: #3B3B50;  
                    }
                    
                    
                    .rasp-TABLE-ul-number{
                        list-style-type: none;
                        
                        text-align: center;
                        padding-inline-start:1%;
                        margin-top:20%;
                        margin-bottom:0%;

                    }
                    
                    .rasp-TABLE-number-li{
    
                        width: 60%;
                        height: 7%;
                        
                        margin-top: 3.9%;
                        padding: 5px;
    
    
                        background: #F1EDED;
                        font-size:16px;
                    }
                    
                    .rasp-TABLE-ul-time{
                        list-style-type: none;
                        font-size: large;
                        padding-inline-start:1%;
                        text-align: center;
                        margin-bottom:0%;
                        margin-top:20%;
                        margin-left:-5.5%;
                    }
                    
                    .rasp-TABLE-time-li{
                        width: 60%;
                        height: 6.8%;
                        
                        margin-top: 3.8%;
                        padding: 5px;
                        font-size:16px;
                        
    
                        background: #F1EDED;
                    }
                    
                    .rasp-TABLE-ul-discipline{
                        list-style-type: none;
                        
                        text-align: center;
                        padding-inline-start:1%;
                        
                        margin-top:20%;
                        margin-bottom:0%;
                        margin-left:-8.5%;
                    }
                    .rasp-TABLE-discipline-li{
                        width: 150%;
                        height: 7.1%;
                        
                        margin-top: 2%;
                        padding: 5px;
    
    
                        background: #F1EDED;
                    }
                    
                    .rasp-TABLE-ul-class{
                        list-style-type: none;
                        padding-inline-start:14.9%;
                        
                        text-align: center;
                        
                        margin-top:20%;
                        margin-bottom:0%;
                    }
                    
                    .rasp-TABLE-class-li{
                        width: 100%;
                        height: 7.12%;
                        
                        margin-top: 2.7%  ;
                        padding: 5px;
    
    
                        background: #F1EDED;
                    }
                    
                    .dop-information{
                        position: absolute;
                        width: 53%;
                        left: 10%;
                        top: 73%;
    
                        font-family: 'Roboto';
                        font-style: normal;
                        font-size: 90%;
                        /* identical to box height */
    
    
                        color: #3B3B50;
                    }   
                    .dop-information-text{
                        position: absolute;
                        left: 22%;
                        top: 74.7%;
    
                        font-family: 'Roboto';
                        font-style: normal;
                        font-size: 100%;
                        /* identical to box height */
    
    
                        color: #3B3B50;
                    }   
                    .footer{
                        margin-top:180%;
                        position:absolute;
                        height:20px;
                        text-align:center;
                    }              
                    
                    #selectNumber{
                        padding-inline-start:0%;
                    }
                    .weekDay-ul{
                        padding-inline-start:2%;
                    }
                    #izmRasp{
    font-size: 75%;
    margin-block-start: 0.5%;
    height:3%;
    margin-left: 1%;
    width:100%;
    position: absolute;
                    }
                    #Registr{
                        margin-top: 130%; 
                    }
                    .school-img{
                        display:none;
                    }
                    body{
                        margin:0px;
                    }
                        }
                </style>
                
            </head>
            <body>
                <div class="main">
                    <div class="main-bar">
                        <div class="gimnName">
                            <p>Гимназия №17</p>
                        </div>
                        <div class="weekDay">
                            <ul class="weekDay-ul">
                                <li class="weekDay-li-week">Числа изменений:</li>
                               <!-- 
                               
                                <li><a href="/nowPn" class="weekDay-li">Понедельник</a></li>
                                <li><a href="/nowVt" class="weekDay-li">Вторник</a></li>
                                <li><a href="/nowSr" class="weekDay-li">Среда</a></li>
                                <li><a href="/nowCh" class="weekDay-li">Четверг</a></li>
                                <li><a href="/nowPt" class="weekDay-li">Пятница</a></li>
                                <li><a href="/nowSb" class="weekDay-li">Суббота</a></li>
                                <li class="weekDay-li-week-change" class="weekDay-li">Другая неделя</li>-->
                                <!--<li>
                                    <div class="look-calendar">
                                    <table id="calendar">
                                    <thead>
                                    <tr>
                                    <td><b>‹</b>
                                    <td colspan="5">
                                    <td><b>›</b>
                                    <tr class="dn"><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
                                    </thead>
                                    <tbody></tbody>
                                    </table>
                                    </div>
                                </li>-->
                                <li>
                                    <ul id="selectNumber">
                                        
                                    </ul>
                                    <!--<select >
                                        
                                    </select>-->
                                </li>
                                                
                                <li id='Registr'><a href="https://raspregister.onrender.com/">Регистрация</a></li>
                            </ul> 
                        </div>
                    </div>
                    
                    
                    <div class="school-img">
                        <img src="https://cdn.discordapp.com/attachments/989420407511732265/1054259814643011584/gimnaziya.jpg" alt="" style="
                            min-width: 100%;
                            
                            /*overflow: hidden;*/
                            
                            margin-top: -420px;
                            margin-bottom: -200px: ; 
                            /*overflow: hidden;*/
                        ">
                    </div>
<!--                    <h1 class="RASPISANIE">Расписание</h1>-->
<!--                    <button style="-->
<!--                        background-color: #2e77ff;-->
<!--                        margin-left: 1700px;-->
<!--                        margin-top: 240px;-->
<!--                        width: 150px;-->
<!--                        height: 60px;-->
<!--                        position:absolute;-->
<!--                        z-index: 500;-->
<!--                        border-radius: 30px;-->
<!--                        color: white;-->
<!--                        font-size: 15px;-->
<!--                    "><a href="https://pure-mountain-90497.herokuapp.com/">Регистрация</a></button>-->
                    
                    <div class="rasp-TABLE">
                        <h2 id="izmRasp">Изменения расписания</h2>
                        
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
                            <li class="rasp-TABLE-time-li" id="oneTime"></li>
                            <li class="rasp-TABLE-time-li" id="twoTime"></li>
                            <li class="rasp-TABLE-time-li" id="threeTime"></li>
                            <li class="rasp-TABLE-time-li" id="fourTime"></li>
                            <li class="rasp-TABLE-time-li" id="fiveTime"></li>
                            <li class="rasp-TABLE-time-li" id="sixTime"></li>
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
                    <div class="footer">
                <h5>&copy; 2022 Расписание 17 Гимназия<br>Разработали веб-приложение с расписанием ученики 8 "В" класса Гимназии №17 Елембаев-Беломорских Роман, Жиделев Николай.</h5>
            </div>
                </div>
                
                
            </body>
        </html>
    `)
    console.log("Set array numbers:",setArrNumbers);
    for(let i = 0; i<setArrNumbers.length; i++){
        res.write(`
                    <script>
                        let select${i} = document.getElementById('selectNumber');
                        let aForDB${i} = document.createElement('a');
                        let br${i} = document.createElement('br');
                        if(${i}%3==0){
                            select${i}.appendChild(br${i});
                        }
                        aForDB${i}.className = "linkOfDBnumber";
                        aForDB${i}.href='/${setArrNumbers[i]}';
                        aForDB${i}.textContent = '${setArrNumbers[i]}'
                        select${i}.appendChild(aForDB${i});
                    </script>
                `)
    }

    if(req.url==='/'){
        writeHTML(obj);
        res.write(`
            <script>
                alert('Актуальные изменения на ${lastDayInDB} число:');
            </script>
        `)

    }






    // setInterval(()=>{
    for(let i = 0; i<setArrNumbers.length; i++){
        if(req.url===`/${setArrNumbers[i]}`){
            obj2.classes[0] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[1] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[2] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[3] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[4] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[5] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[6] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[7] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[8] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
            obj2.classes[9] = ['', ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];

            obj2.dayOfWeek = [];
            obj2.headings = [];

            checkRasp2(setArrNumbers[i]);
            res.write(`
                        <script>
                           alert("Подождите пару секунд для ответа базы данных на ${setArrNumbers[i]} число и закройте окно"); 
                        </script>
                    `)
            setTimeout(()=>{
                writeHTML(obj2);
            }, 1500)
        }
    }
    //     if(req.url==='/30.09'){
    //         checkRasp2(setArrNumbers[0]);
    //         setTimeout(()=>{writeHTML(obj2);}, 2000)
    //     }
    // }, 50)



});

server.listen(PORT, () => {
    console.log(`server is running in port:3000...`);
})

// просто так комментарий


//Киберпанк2077