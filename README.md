Web Service
This web service manage pool of child-item.

3 OPTIONS: 

1.Do like to item for specific child.

2.Add child to MOM-USER. 

3.Get item By Category and Age.

Usage:

To Do like to item for specific child:

http://localhost:8080//like_child_item/:mom_name/:child_name/:item
EXAMPLE:
http://localhost:8080//like_child_item/nili/shir/bilbi
JSON response example:

[
    {
        firstName: "John",
        lastName: "Doe",
        id: 3,
        avarage: "92",
        year: "2013"
    },
    {
        firstName: "Anna",
        lastName: "Smith",
        id: 4,
        average: "100",
        year: "2014"
    },
    {
        firstName: "Mor",
        lastName: "Kasus",
        id: 1,
        average: "100",
        year: "2016"
    },
    {
        firstName: "Yossi",
        lastName: "Azo",
        id: 7,
        average: "98",
        year: "2016"
    },
    {
        firstName: "Daniel",
        lastName: "sha",
        id: 8,
        average: "94",
        year: "2013"
    },
    {
        firstName: "Maria",
        lastName: "lala",
        id: 9,
        average: "100",
        year: "2014"
    },
    {
        firstName: "Dani",
        lastName: "dan",
        id: 10,
        average: "98",
        year: "2016"
    },
    {
        firstName: "Salah",
        lastName: "Moalem",
        id: 11,
        average: "92",
        year: "2016"
    }
]
To get student by ID:

https://ex1-students-morkasus.herokuapp.com/student/{id}

Replace {id} with some number (ex: 1, 2 ...)

JSON response example:

{
    firstName: "John",
    lastName: "Doe",
    id: 3,
    avarage: "92",
    year: "2013"
}
To get all excellence students by Year:

https://ex1-students-morkasus.herokuapp.com/studentsyear/{year}

Replace {year} with some number (ex: 2016, 2015, ...)

JSON response example:

[
    {
        firstName: "Mor",
        lastName: "Kasus",
        id: 1,
        average: "100",
        year: "2016"
    },
    {
        firstName: "Yossi",
        lastName: "Azo",
        id: 7,
        average: "98",
        year: "2016"
    },
    {
        firstName: "Dani",
        lastName: "dan",
        id: 10,
        average: "98",
        year: "2016"
    },
    {
        firstName: "Salah",
        lastName: "Moalem",
        id: 11,
        average: "92",
        year: "2016"
    }
]
Author

Inbar Takdim