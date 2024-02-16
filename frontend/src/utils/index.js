import FileSaver from 'file-saver'

function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

export { downloadImage }