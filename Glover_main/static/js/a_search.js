fetch('a_search.json')
    .then(function(response){
        if (!response.ok){
            throw new Error('에러러러러러');
        }
        return response.json();
    })
    .then(function(students){
    students.forEach(function(student){
    const template=`
            <tr>
            <td>${student.department}</td>
            <td>${student.sid}</td>
            <td>${student.name}</td>
            <td><input type="checkbox" name="choose"${student.check}></td>
            </tr>
            `;
            $(".table").append(template)
})
    })
.catch(function(error){
    console.log(error);
});