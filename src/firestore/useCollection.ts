import { 
    useContext, 
    useEffect, 
    useState, 
} from 'react';
import Context from '../context';
import { 
    Doc, 
    CollectionRef, 
    UseCollectionHook,
    QuerySnapshot,
    DocumentChange,
} from './firestore';

export interface UseCollectionProps {
    path: string;
    query?: (ref: CollectionRef) => CollectionRef;
}

const defaultData: Doc[] = [];

export default function useCollection(props: UseCollectionProps): UseCollectionHook {
    const { path, query } = props;
    const { app } = useContext(Context);
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(defaultData); 
    
    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;
            
            setIsLoading(true);
            finalQuery
                .onSnapshot((querySnapshot: QuerySnapshot) => {
                    const ret: Doc[] = [];
                    querySnapshot.docChanges().forEach((change: DocumentChange) => {
                        ret.push({
                            id: change.doc.id,
                            data: change.doc.data(),
                            changeType: change.type,
                        });
                    });
                    setData(ret);
                    setIsLoading(false);    
                });
               
        }, [props.path]);
    }
    return [data, isLoading];
}
