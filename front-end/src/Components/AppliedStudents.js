import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { useParams, Link } from "react-router-dom";
import { Container, InputGroup, Table, FormControl } from "react-bootstrap";

function AppliedStudents() {
    
    const {company} = useParams();
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch(`/StudentInterests/${company}`);
            const data = await res.json();
            setStudents(data);
        }
        fetchStudents();
    }, [company]);

    const filteredStudents = students.filter(student => student.studentId.includes(search));

    return (
        <div>
            <AdminHeader/>
            <Container>
                <InputGroup style={{marginTop: "20px"}} className="search-bar">
                    <FormControl
                    placeholder="Search By Roll No"
                    aria-label="Search By Roll No"
                    aria-describedby="basic-addon1"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    />
                </InputGroup>
                <Table responsive style={{marginTop: "20px"}}>
                    <thead>
                    <tr style={{backgroundColor: "#D7DAF2"}}>
                        <th>S.No</th>
                        <th>Roll No</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                                <tr key={student.studentId}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link style={{fontSize: "16px", fontWeight: "lighter", color: "blue"}} className="link" to={`/studentInterests/${company}/${student.studentId}`}>
                                            {student.studentId}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{textAlign: "center", color: "red", fontSize: "18px"}}>No Student Applied</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default AppliedStudents;
