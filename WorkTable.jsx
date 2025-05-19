function WorkTable({ forms }) {
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Needed Forms</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.neededForms.map((form, index) => (
                        <tr key={`needed-${index}`}>
                            <td>{form.name}</td>
                            <td>{form.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Helpful Forms</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.helpfulForms.map((form, index) => (
                        <tr key={`helpful-${index}`}>
                            <td>{form.name}</td>
                            <td>{form.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default WorkTable;