import * as FileSystem from 'expo-file-system';

export const CreateFolderIfNotExist = (folderName) => {
    const path = `${FileSystem.documentDirectory}${folderName}`;
    return FileSystem.getInfoAsync(path).then(({ exists }) => {
        if (!exists) {
            return FileSystem.makeDirectoryAsync(path)
        } else {
            return Promise.resolve(true)
        }
    })
}