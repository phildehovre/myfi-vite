import axios from 'axios'
import { db } from "../Config/firebase";
import {
    doc, setDoc, updateDoc, arrayUnion, getFirestore,
    onSnapshot,
    collection,
    query,
    where,
    orderBy,
    getDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { auth } from '../Config/firebase'
import {
    useQuery,
    hashQueryKey,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient();

export const getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().portfolio
    }

    if (!docSnap.exists()) {
        console.log("No such document!");
    }
}

export const useUser = (uid, onSuccess, onError) => {
    return useQuery(['users', { uid }], () => getUser(uid), {
        onSuccess,
        onError,
        enabled: !!uid
    })
}

// export const useTimeSeries = (t, onSuccess, onError) => {
//     return useQuery(['time-series', { t }], () => fetchTimeSeries(t), {
//         onSuccess,
//         onError,
//         enabled: !!t
//     })
// }


export const fetchWatchlist = async (uid) => {
    const res = await getDoc(doc(db, 'users', uid), {
    })
    return res.data()
}

// Create a new user
export function createUser(uid, data) {
    return setDoc(doc(db, "users", uid), data, { merge: true });
}

// Update an existing user
export function updateUser(uid, data) {
    return updateDoc(doc(db, "users", uid), data);
}


/**** HELPERS ****/

// Store Firestore unsubscribe functions
const unsubs = {};

function createQuery(getRef) {
    // Create a query function to pass to `useQuery`
    return async ({ queryKey }) => {
        let unsubscribe;
        let firstRun = true;
        // Wrap `onSnapshot` with a promise so that we can return initial data
        const data = await new Promise((resolve, reject) => {
            unsubscribe = onSnapshot(
                getRef(),
                // Success handler resolves the promise on the first run.
                // For subsequent runs we manually update the React Query cache.
                (response) => {
                    const data = format(response);
                    if (firstRun) {
                        firstRun = false;
                        resolve(data);
                    } else {
                        client.setQueryData(queryKey, data);
                    }
                },
                // Error handler rejects the promise on the first run.
                // We can't manually trigger an error in React Query, so on a subsequent runs we
                // invalidate the query so that it re-fetches and rejects if error persists.
                (error) => {
                    if (firstRun) {
                        firstRun = false;
                        reject(error);
                    } else {
                        client.invalidateQueries(queryKey);
                    }
                }
            );
        });

        // Unsubscribe from an existing subscription for this `queryKey` if one exists
        // Then store `unsubscribe` function so it can be called later
        const queryHash = hashQueryKey(queryKey);
        unsubs[queryHash] && unsubs[queryHash]();
        unsubs[queryHash] = unsubscribe;

        return data;
    };
}

// Automatically remove Firestore subscriptions when all observing components have unmounted
client.queryCache.subscribe(({ type, query }) => {
    if (
        type === "observerRemoved" &&
        query.getObserversCount() === 0 &&
        unsubs[query.queryHash]
    ) {
        // Call stored Firestore unsubscribe function
        unsubs[query.queryHash]();
        delete unsubs[query.queryHash];
    }
});

// Format Firestore response
function format(response) {
    // Converts doc into object that contains data and `doc.id`
    const formatDoc = (doc) => ({ id: doc.id, ...doc.data() });
    if (response.docs) {
        // Handle a collection of docs
        return response.docs.map(formatDoc);
    } else {
        // Handle a single doc
        return response.exists() ? formatDoc(response) : null;
    }
}


export function QueryClientProvider(props) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
            <ReactQueryDevtools />
        </QueryClientProviderBase>
    );
}


const fetchTimeSeries = (t, interval = '1h', outputSize = 5000) => {
    return axios.get(`https://api.twelvedata.com/time_series?symbol=${t.symbol}&apikey=${import.meta.env.VITE_REACT_APP_TWELVEDATA_API_KEY}`, {
        params: {
            symbol: t.symbol,
            interval: interval,
            outputsize: outputSize
        }
    })
}


export const useTimeSeries = (t, onSuccess, onError) => {
    return useQuery(['time-series', { t }], () => fetchTimeSeries(t), {
        onSuccess,
        onError,
        enabled: !!t
    })
}

export const updateWatchlist = async (uid, ticker) => {
    const docRef = doc(db, "watchlists", uid)
    const docSnap = await getDoc(docRef)
    if (!ticker) return

    if (docSnap.exists()) {
        updateDoc(docRef, { watchlist: arrayUnion({ ...ticker, 'owner': uid }) })
    } else {
        setDoc(docRef, { 'watchlist': ticker })
    }

}

export function useWatchlistByOwner(owner) {
    return useQuery(
        ["watchlist", { owner }],
        createQuery(() =>
            query(
                doc(db, "watchlists", owner),
            )
        ),
        {
            enabled: !!owner,
        }
    );
}
// export const updateWatchlist = async (uid, ticker) => {
//     const docRef = doc(db, "users", uid)
//     const docSnap = await getDoc(docRef)
//     if (!ticker) return

//     if (docSnap.exists()) {
//         updateDoc(docRef, { watchlist: arrayUnion({ ticker }) })
//     } else {
//         setDoc(docRef, { 'watchlist': [ticker] })
//     }
// }
