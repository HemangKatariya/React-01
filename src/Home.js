import React, { useState } from 'react'
import './App.css'
import MUIDataTable from 'mui-datatables';
import Layout from './Layout'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactImageMagnify from 'react-image-magnify';
import QRCode from "react-qr-code";
import ReactApexChart from 'react-apexcharts';
import zIndex from '@material-ui/core/styles/zIndex';
import { PieChart } from 'react-minimal-pie-chart';
import { isNumber } from '@mui/x-data-grid/internals';
import { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';

export default function Home() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [maths, setMaths] = useState('')
    const [science, setScience] = useState('')
    const [english, setEnglish] = useState('')
    const [id, setId] = useState('')
    const [data, setdata] = useState([])
    const [img, setImg] = useState([])
    const [modalData, setModalData] = useState({})
    const [motaimg, setMotaimg] = useState('')


    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleMathsChange = (e) => {
        setMaths(e.target.value)
    }
    const handleScienceChange = (e) => {
        setScience(e.target.value)
    }
    const handleEnglishChange = (e) => {
        setEnglish(e.target.value)
    }


    const submit = () => {
        let obj = {
            name: name,
            email: email,
            pass: pass,
            maths: maths,
            science: science,
            english: english,
            img: img,
            id: Date.now()
        }
        console.log(img)
        setdata([...data, obj])

        setEmail('')
        setName('')
        setPass('')
        setMaths('')
        setScience('')
        setEnglish('')
        setId(' ')
        setImg([])
    }

    const handleRemoveItem = (id) => {
        const hk = (data.filter(item => item.id !== id));
        setdata(hk)

    };
    const handleEditItem = (tableMeta) => {
        console.log(tableMeta.rowData)
        setName(tableMeta.rowData[0]);
        setEmail(tableMeta.rowData[1]);
        setPass(tableMeta.rowData[3]);
        setImg(tableMeta.rowData[7])
        setId(tableMeta.rowData[2])
        setMaths(tableMeta.rowData[4])
        setScience(tableMeta.rowData[5])
        setEnglish(tableMeta.rowData[6])

        let objIndex = data.findIndex((obj => obj.id == tableMeta.rowData));
        console.log(objIndex)
    };

    const Update = () => {

        let objIndex = data.findIndex((item => item.id === id));
        console.log(id)
        console.log(data)
        console.log(objIndex)
        data[objIndex].name = name
        data[objIndex].email = email
        data[objIndex].pass = pass
        data[objIndex].img = img
        data[objIndex].maths = maths
        data[objIndex].science = science
        data[objIndex].english = english
        setdata([...data])
        setEmail('')
        setName('')
        setPass('')
        setId('')
        setMaths('')
        setScience('')
        setEnglish('')
        setImg([])
    }

    const handleSubmit = () => {
        let editKarvanuChhe = false;
        const updatedData = data.map((item) => {
            if (item.id === id) {
                editKarvanuChhe = true;
                return {
                    ...item,
                    editKarvanuChhe: true,
                };
            }
            return item;
        });

        if (editKarvanuChhe) {
            Update(updatedData);
        } else {
            submit();
        }
    };


    const handleImageUpload = (event) => {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = e.target.result;
                setImg((prevImages) => [...prevImages, img]);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = (imgurl, i) => {
        console.log(imgurl)
        setImg(img.filter(item => item !== imgurl));
    }


    const columns = [
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "EMAIL",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "pass",
            label: "PASSWORD",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "maths",
            label: "MATHS",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "science",
            label: "SCIENCE",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "english",
            label: "ENGLISH",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "img",
            label: "IMAGE",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => (
                    <img src={value[0]} />
                )
            }
        },

        {
            name: "edit",
            label: "EDIT",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="success" onClick={() => handleEditItem(tableMeta)}>EDIT</Button>
                )

            }
        },
        {
            name: "id",
            label: "DELETE",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => (
                    <Button name={value} onClick={() => handleRemoveItem(value)} variant="outlined" color="error"> DELETE </Button>
                )
            }
        },

        {
            name: "id",
            label: "VIEW",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="success" onClick={() => handleOpen(value)}>view</Button>
                )

            }
        },
    ];

    const options = {
        filterType: 'checkbox'
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    };

    const stylee = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex'

    };


    const [open, setOpen] = React.useState(false);

    const handleOpen = (id) => {
        setOpen(true);
        console.log(id)
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                setModalData(data[i])

                setMotaimg(data[i].img[0])
            }
            console.log(modalData)
        }

    }
    const handleClose = () => setOpen(false);

    const handleImage = (src) => {
        let BigImg = document.getElementsByClassName(('bigImg'))
        BigImg.src = src
        setMotaimg(src)
    }
    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };





    const series = [Number(modalData.maths), Number(modalData.science), Number(modalData.english)];
    const optionsss = {
        chart: {
            width: 380,
            type: 'polarArea',
        },
        labels: ['Maths', 'English', 'Science'],
        fill: {
            opacity: 1,
        },
        stroke: {
            width: 1,
            colors: undefined,
        },
        yaxis: {
            show: false,
        },
        legend: {
            position: 'bottom',
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0,
                },
                spokes: {
                    strokeWidth: 0,
                },
            },
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6,
            },
        },
    };


    const qrCodeRef = useRef(null);
    const downloadQRCode = () => {
        const qrCodeElement = qrCodeRef.current;

        toJpeg(qrCodeElement)
            .then((dataUrl) => {
                saveAs(dataUrl, 'qrcode.jpg');
            })
            .catch((error) => {
                console.error('Error generating QR code image:', error);
            });
    }
    // const isFormValid = name !== '' && email !== '' && pass !== '' && maths !== '' && science !== '' && english !== '';
    // disabled = {!isFormValid}

    return (
        <Layout >

            Name: <input type='text' onChange={handleNameChange} value={name} ></input><br></br><br></br>
            Email: <input type='email' onChange={handleEmailChange} value={email}></input><br></br><br></br>
            Password:  <input type='password' onChange={(e) => setPass(e.target.value)} value={pass}></input><br></br><br></br>
            Maths: <input type='number' onChange={handleMathsChange} value={maths} ></input><br></br><br></br>
            Science: <input type='number' onChange={handleScienceChange} value={science} ></input><br></br><br></br>
            English: <input type='number' onChange={handleEnglishChange} value={english} ></input><br></br><br></br>

            <input type="file" multiple accept="image/*" onChange={handleImageUpload} /><br></br><br></br>

            {
                img.map((item) => {
                    return (
                        <>
                            <img src={item} style={{ maxHeight: '80px', maxWidth: '80px', marginLeft: '15px' }} />
                            <button name={item.id} onClick={() => handleRemoveImage(item)}>X</button>
                        </>
                    )
                })
            }
            <br></br><br></br>

            <Button color="secondary" onClick={handleSubmit} style={{ marginBottom: '20px', border: '1px dashed blue', color: 'blue' }} >SUBMIT</Button>
            <div style={{ maxWidth: '100%' }}>
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            columns={columns}
                            data={data}
                            title='Customer data'
                            options={options}
                            img={img}
                        />
                    </ThemeProvider>
                </CacheProvider>

            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width: 600 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Customer data
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div>
                                {/* <img src={modalData.img && modalData.img[0]} id='bigImg' style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '20%' }} alt="" /><br></br> */}
                                <div id="img"   >
                                    <ReactImageMagnify
                                        // {...props}
                                        {...{
                                            smallImage: {
                                                alt: "Wristwatch by Ted Baker London",
                                                isFluidWidth: true,
                                                className: 'bigImg',
                                                src: (motaimg),
                                            },
                                            largeImage: {
                                                src: (motaimg),
                                                width: 1200,
                                                height: 1800
                                            },
                                            enlargedImageContainerStyle: {
                                                zIndex: "1500",

                                            },
                                            enlargedImageContainerDimensions: {
                                                width: "100%",
                                                height: "100%",
                                                opacity: '5000'
                                            },
                                        }}
                                    />
                                </div>
                                {modalData.img && modalData.img.map((item) => {
                                    return (
                                        <img src={item} alt="" onClick={() => handleImage(item)} style={{ maxWidth: '90px', maxHeight: '90px', margin: "4px" }} />
                                    )
                                })}

                                <br></br>
                                NAME:<h4>{modalData.name}</h4><br></br>
                                EMAIL:<h4>{modalData.email}</h4><br></br>
                                PASSWORD:<h4>{modalData.pass}</h4><br></br>
                                MATHS:<h4>{modalData.maths}</h4><br></br>
                                SCIENCE:<h4>{modalData.science}</h4><br></br>
                                ENGLISH:<h4>{modalData.english}</h4><br></br>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                <Button onClick={handleClose} variant="outlined" color="error"> CLOSE </Button>
                                <Button style={{ marginLeft: '5px' }} variant="outlined" color="success" onClick={handleOpen2}>Open QR Code and Chart</Button>
                            </div>
                        </Typography>

                        <Modal
                            open={open2}
                            onClose={handleClose2}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...stylee, width: 600 }} >
                                {console.log(modalData)}
                                <div>
                                    {<QRCode value={JSON.stringify(modalData)} ref={qrCodeRef} style={{ width: '200px', height: '200px' }} />}
                                    <br /><br /><Button variant="outlined" color="primary" onClick={downloadQRCode}>Download QR Code</Button>

                                    <br></br><br></br>
                                    NAME:  <h4>{modalData.name}</h4><br></br>
                                    STUDENT ID:  <h4>{modalData.id}</h4><br></br>
                                </div>
                                <div >


                                    <div id="chart">
                                        <ReactApexChart options={optionsss} series={series} type="polarArea" width={380} />
                                    </div>
                                    <Button variant="outlined" color="error" style={{ margin: '15px' }} onClick={handleClose2}>Close</Button>
                                </div>
                            </Box>
                        </Modal>
                    </Box>
                </Modal>
            </div>

            {/* <table>
                <th>Name</th>
                <th>Email</th>
                <th>Pass</th>
                <th>ID</th>
                <th>Image</th>
                <th>Remove</th>
                <th>Edit</th>
                {
                    data.map((item, i) => {
                        return (
                            <>
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pass}</td>
                                    <td>{item.id}</td>
                                    <td> <img src={item.img[i]} /></td>
                                    <td><button name={item.id} onClick={() => handleRemoveItem(item.id)}>X</button></td>
                                    <td> <button onClick={() => handleEditItem(item, item.id)}>Edit</button></td>
                                </tr>
            
                            </>
            
            
                        )
                    })
                }
            </table> */}



        </Layout>
    )

}
