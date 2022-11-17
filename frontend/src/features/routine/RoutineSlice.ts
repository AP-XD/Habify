import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ITask from '../../interfaces/task';
import config from '../../config/config';
import IUser from '../../interfaces/user';
import { dateDiffInDays, getInitialNote } from '../../utils/functions';

export interface IJournalState {
    notes: ITask[];
    loading: boolean;
    isSidebarShown?: boolean;
    isFilterBarShown?: boolean;
    error: string;
    success: string;
    oldestTaskDate: number;
}

const initialState: IJournalState = {
    notes: [],
    loading: true,
    isSidebarShown: (document.documentElement.clientWidth > 1023 && localStorage.getItem('isSidebarShown') === 'true') || false,
    isFilterBarShown: (document.documentElement.clientWidth > 425 && localStorage.getItem('isFilterBarShown') === 'true') || false,
    error: '',
    success: '',
    oldestTaskDate: 0
};

export interface IFilterNotes {
    user: IUser;
    filter?: (notes: ITask[]) => ITask[];
    sort?: (notes: ITask[]) => ITask[];
}

export const fetchAllNotes = createAsyncThunk('journal/fetchAllNotesStatus', async ({ user, filter, sort }: IFilterNotes) => {
    const response = await axios({
        method: 'GET',
        url: `${config.server.url}/tasks/${user._id}`
    });

    if (response.status === 200 || response.status === 304) {
        let notes = response.data.notes as ITask[];
        const oldestTaskDate = notes.sort((x, y) => y.startDate - x.startDate).at(-1)?.startDate;
        notes.push(getInitialNote(user));
        notes = filter ? filter(notes) : notes;
        const endNotes: ITask[] = notes
            .filter((note) => dateDiffInDays(new Date(note.startDate), new Date(note.endDate)) + 1 >= 2)
            .map((note) => {
                // Adding end date notes.
                const copyNote = JSON.parse(JSON.stringify(note));
                copyNote.isEndNote = true;
                const startDate = copyNote.startDate;
                copyNote.startDate = copyNote.endDate;
                copyNote.endDate = startDate;
                return copyNote;
            });
        notes = [...notes, ...endNotes].filter((note) => note.startDate <= new Date().getTime());

        notes = sort ? sort(notes) : notes.sort((x, y) => y.startDate - x.startDate);
        return { notes: notes, oldestTaskDate: oldestTaskDate };
    } else {
        return { notes: [] };
    }
});

export const routineSlice = createSlice({
    name: 'routine',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setNotes: (state, { payload }: PayloadAction<ITask[]>) => {
            state.notes = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
        setShowSidebar: (state, { payload }: PayloadAction<boolean>) => {
            state.isSidebarShown = payload;
            localStorage.setItem('isSidebarShown', payload.toString());
        },
        setShowFilterBar: (state, { payload }: PayloadAction<boolean>) => {
            state.isFilterBarShown = payload;
            localStorage.setItem('isFilterBarShown', payload.toString());
        },
        setSuccess: (state, { payload }: PayloadAction<string>) => {
            state.success = payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch all notes
        builder.addCase(fetchAllNotes.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllNotes.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.loading = false;
            if (!state.oldestTaskDate) state.oldestTaskDate = action.payload.oldestTaskDate ? action.payload.oldestTaskDate : state.oldestTaskDate;
        });
        builder.addCase(fetchAllNotes.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Unable to retreive notes.';
        });
    }
});

export const { setNotes, setError, setSuccess, setShowFilterBar, setShowSidebar } = routineSlice.actions;

export default routineSlice.reducer;
