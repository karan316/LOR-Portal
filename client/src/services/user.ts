//TODO: change teacher and student to StudentUser and TeacherUser
export interface Application {
    _id?: string;
    faculty: {
        department: {
            name: string;
        };
        id: string;
        email: string;
        name: string;
    };
    student: {
        department: {
            name: string;
        };
        id: string;
        email: string;
        name: string;
        regNo: string;
    };
    facultyDepartment: string;
    studentDepartment: string;
    statementOfPurpose: string;
    status: string;
}
export interface User {
    id: string;
    type: string;
    department: string;
    name: string;
    email: string;
    password: string;
}
export interface StudentUser {
    info: User;
    regNo: string;
    applications: Application[];
}
export interface TeacherUser {
    info: User;
    teacherId: string;
    applications: Application[];
}

// export const teacher: TeacherUser = {
//     info: {
//         id: "1",
//         type: "teacher",
//         department: "CSE",
//         name: "Rajesh",

//         email: "rajesh@lor.com",
//         password: "abc123",
//     },
//     teacherId: "123456",
//     applications: [
//         {
//             id: "1",
//             faculty: "Rajesh",
//             student: "Rahul",
//             facultyDepartment: "CSE",
//             studentDepartment: "ICT",
//             statementOfPurpose:
//                 "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Labore deleniti cum distinctio sit, ipsam fugit voluptatempariatur, sed sapiente nostrum rerum modi, facere voluptatesat. Id atque debitis maxime molestias sed omnis vitaereprehenderit alias dolorum quae corrupti exercitationemipsa dolor aspernatur, iusto laborum aliquam! Fugit illoreiciendis itaque nam modi necessitatibus, ipsa omnis nulladeleniti quidem dolores magni, porro corrupti distinctio!Maxime cupiditate magnam excepturi quam, blanditiisaspernatur illum, beatae fugit corrupti quisquam optio natusipsa corporis quia nam exercitationem molestias nemotenetur. Accusantium deserunt odio beatae quam, sapiente sednon odit eaque, pariatur dignissimos inventore rerumconsectetur quisquam perspiciatis porro autem temporibusmagnam. Earum dolores nisi quo doloribus totam velit cumdeleniti adipisci! Sint assumenda earum temporibus odiocupiditate? Accusantium, quod optio! Blanditiis quidem aliasmagnam iure velit facere nobis magni hic quas vel sapientecum ipsum voluptas labore inventore, corrupti dolorumpariatur ratione officiis deleniti id tempora harum! Quamnihil delectus, quos, hic quo consectetur voluptates,blanditiis laborum fugiat atque quidem dolores culpanesciunt assumenda molestiae deserunt nisi! Sit non rem hicpariatur, praesentium in. Excepturi tempora voluptatibusiure ea accusamus ipsam laboriosam error molestiae omnisquasi eius animi laborum, fuga provident impedit quaetemporibus repellat odit assumenda quis voluptatem commodi.Exercitationem, reprehenderit qui doloremque architectominima, quaerat at dolor cupiditate debitis pariaturincidunt est quia explicabo laudantium officiis optiodistinctio dolores dolorum blanditiis possimus, veniamvoluptatem molestias unde. Sit voluptatum ipsa officia istemagnam aliquam repudiandae obcaecati enim, cupiditate rerumdolores accusamus ab autem recusandae quam perspiciatis illoquae aliquid odit ullam voluptatibus asperiores sed aperiamdistinctio. Voluptate rerum nobis ea nihil reiciendis culpadoloribus eveniet fuga recusandae ullam assumenda dolores,impedit, expedita neque itaque deleniti unde. Laboriosamfugit exercitationem obcaecati dolor inventore providentfuga id ullam, non aut, necessitatibus quae maiores doloreoptio? Aperiam, excepturi.",
//             status: "Accepted",
//         },
//     ],
// };
