
import icons from '../../icons.json'

const Icon = ({ tags, className }) => {

    let iconSelect = icons.filter(i => i.tags === tags)[0],
        viewBox = `${iconSelect.viewBox.x} ${iconSelect.viewBox.y} ${iconSelect.viewBox.width} ${iconSelect.viewBox.height}`

    return (
            <svg className={className}  viewBox={viewBox}>
                 { iconSelect.paths.map((p, index) => <path key={index} d={p}></path> )  }
            </svg>
    )
}

export default Icon