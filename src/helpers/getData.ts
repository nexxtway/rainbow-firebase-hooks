import { QueryDocumentSnapshot, UseCollectionData } from '../firestore/firestore';

export default function getData(docs: QueryDocumentSnapshot[], onlyIds: boolean): UseCollectionData {
    if (onlyIds) {
        return docs.map(doc => doc.id);
    }
    return docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
    }));
}
