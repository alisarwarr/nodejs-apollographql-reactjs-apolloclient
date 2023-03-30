//REACT-ROUTER-DOM
import { Link } from 'react-router-dom';
//APOLLO-CLIENT
import { useQuery, gql } from '@apollo/client';


//APOLLO-CLIENT ( query )
const GET_CLIENTS = gql`
    query ExampleQuery {
        allClients {
            id
            age
            name
            gender
            additionalInfo {
                phone
                address
                email
                company
                gender
            }
        }
    }
`;


interface AdditionalInfo {
    gender?: string;
    company: string;
    email: string;
    phone: string;
    address: string;
}


interface Client {
    id: string;
    name: string;
    age: number;
    gender?: string;
    additionalInfo: AdditionalInfo;
}


interface ClientsResult {
    allClients: Client[];
}


export default function Listing(): JSX.Element {
    const { loading, error, data } = useQuery<ClientsResult>(GET_CLIENTS);


    if (loading) return <div className="h-screen bg-gradient-to-r from-green-400 to-blue-500">Loading...</div>;
    if (error) return <div className="h-screen bg-gradient-to-r from-green-400 to-blue-500">Error: {error.message}</div>;


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 tracking-wide text-center text-white animate-bounce">
                    Clients 👬
                </h1>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <table className="table-fixed w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-base text-gray-700 uppercase tracking-wider font-bold">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-base text-gray-700 uppercase tracking-wider font-bold">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-base text-gray-700 uppercase tracking-wider font-bold">
                                    Age
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.allClients?.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-center font-medium text-gray-900">{client.id.slice(0, 15)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-center font-medium text-gray-900">
                                            <Link to={`/${client.id}`} className="hover:text-green-500">{client.name}</Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-center font-medium text-gray-900">{client.age}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}