import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ANSIConverter from 'ansi-to-html'
import htmlParser from 'html-react-parser'

import Button from '../../$buttons/Button'
import Build from '../../Build/Build'
import Footer from '../../Footer/Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import SettingsBtn from '../../$buttons/SettingsBtn'
import Loader from '../../Loader/Loader'

import rebuildIcon from '../../../assets/icons/12_rebuild.svg'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import * as buildsActions from '../../../state/actions/builds'

import './BuildPage.css'

const converter = new ANSIConverter({ bg: '#F2F2F2', fg: '#000' })

const BuildPage = () => {
    const history = useHistory()
    const { buildNumber } = useParams()
    const [build, setBuild] = useState(null)
    const [logs, setLogs] = useState('')
    const { fetchBuild, fetchLogs, setBuild: setBuildAction } = useActions(buildsActions)
    const { loading, repoName } = useSelector(state => ({
        loading: state.builds.loading,
        repoName: state.settings.repo
    }))

    useEffect(() => {
        async function getBuild() {
            try {
                const build = await fetchBuild(buildNumber)
                setBuild(build)
            } catch (error) {
                history.push('/')
                toast.error('Couldn\'t fetch build')
            }

            try {
                const logs = await fetchLogs(buildNumber)
                setLogs(logs)
            } catch (error) {
                toast.error('Couldn\'t fetch logs')
            }
        }

        setBuild(null)
        setLogs('')
        getBuild()
    }, [buildNumber])

    useEffect(() => {
        return () => {
            toast.dismiss()
        }
    }, [])

    const onRebuild = async () => {
        if (build) {
            try {
                const buildId = await setBuildAction(build.commitHash)
                history.push(`/build/${buildId}`)
            } catch (error) {
                toast.error('Another repository')
            }
        }
    }

    return (
        <div className="page">
            <Header title={<HeaderTitle color="#000" value={repoName} />}>
                <Button
                    variant="silent"
                    adaptive
                    action={onRebuild}
                    disabled={!Boolean(build)}
                    icon={rebuildIcon}>Rebuild</Button>
                <SettingsBtn />
            </Header>
            <main className="build-page page__body">
                <Loader loading={loading} />
                {build &&
                    <div className="container">
                        <Build key={build.id} {...build} />
                    </div>}
                <code className="log build-page__log container">
                    <pre className="log__content">
                        {htmlParser(converter.toHtml(logs))}
                    </pre>
                </code>
            </main>
            <Footer />
        </div>
    )
}

export default BuildPage